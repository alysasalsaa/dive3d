<?php

namespace App\Http\Controllers\Api;

use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Badge;
use App\Models\UserBadge;
use App\Models\UserProgress;
use App\Models\QuizResult;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        // --- Badges: semua badge + status earned user ---
        $earnedIds = UserBadge::where('user_id', $user->id)->pluck('badge_id')->toArray();
        $badges = Badge::all()->map(fn($b) => [
            'id'       => $b->id,
            'name'     => $b->name,
            'icon'     => $b->icon,
            'achieved' => in_array($b->id, $earnedIds),
            'tooltip'  => $b->description,
        ])->values();

        // --- Learning progress: dari user_progress + module ---
        $colors = ['emerald', 'blue', 'amber', 'blue'];
        $progressRecords = UserProgress::with(['module.pois'])
            ->where('user_id', $user->id)
            ->get();

        $learning_progress = $progressRecords->values()->map(function ($p, $index) use ($colors) {
            // Jika completed via LMS → 100%, jika tidak → hitung dari POI
            if ($p->completed) {
                $percentage = 100;
            } else {
                $totalPois    = $p->module->pois->count();
                $visitedCount = count($p->visited_pois ?? []);
                $percentage   = $totalPois > 0 ? round(($visitedCount / $totalPois) * 100) : 0;
            }

            return [
                'course_id'           => $p->module->id,
                'title'               => $p->module->title,
                'progress_percentage' => $percentage,
                'color'               => $colors[$index % count($colors)],
            ];
        });

        // --- User info: XP dari rata-rata skor quiz × modul selesai ---
        $completedCount = UserProgress::where('user_id', $user->id)
            ->where('completed', true)->count();
        $avgScore = QuizResult::where('user_id', $user->id)->avg('score') ?? 0;
        $currentXp = (int) round($completedCount * $avgScore);

        // --- Leaderboard: top 5 berdasarkan total XP (modul selesai × rata-rata skor) ---
        $allUsers = DB::table('users')
            ->leftJoin('user_progress', function ($join) {
                $join->on('users.id', '=', 'user_progress.user_id')
                     ->where('user_progress.completed', true);
            })
            ->leftJoin('quiz_results', 'users.id', '=', 'quiz_results.user_id')
            ->select(
                'users.id',
                'users.name',
                DB::raw('COUNT(DISTINCT user_progress.id) as completed_count'),
                DB::raw('COALESCE(AVG(quiz_results.score), 0) as avg_score')
            )
            ->groupBy('users.id', 'users.name')
            ->orderByDesc(DB::raw('COUNT(DISTINCT user_progress.id) * COALESCE(AVG(quiz_results.score), 0)'))
            ->orderByDesc(DB::raw('COUNT(DISTINCT user_progress.id)'))
            ->get();

        $leaderboard = $allUsers->take(5)->values()->map(fn($u, $i) => [
            'rank'         => $i + 1,
            'name'         => $u->name,
            'xp'           => (int) round($u->completed_count * $u->avg_score),
            'avatar_emoji' => '👤',
            'is_me'        => $u->id === $user->id,
        ]);

        // Tambahkan posisi user sendiri jika tidak masuk top 5
        $myRank = $allUsers->search(fn($u) => $u->id === $user->id);
        if ($myRank !== false && $myRank >= 5) {
            $me = $allUsers[$myRank];
            $leaderboard->push([
                'rank'         => $myRank + 1,
                'name'         => $me->name . ' (Kamu)',
                'xp'           => (int) round($me->completed_count * $me->avg_score),
                'avatar_emoji' => '🤿',
                'is_me'        => true,
            ]);
        }

        $data = [
            'user' => [
                'id'            => $user->id,
                'name'          => $user->name,
                'level'         => 0,
                'rank_name'     => 'Rookie',
                'current_xp'    => $currentXp,
                'next_level_xp' => 500,
                'gems'          => 0,
            ],
            'badges'           => $badges,
            'learning_progress' => $learning_progress,

            // Quiz: data real dari tabel quiz_results
            'recent_quizzes' => QuizResult::where('user_id', $user->id)
                ->latest()
                ->limit(5)
                ->get()
                ->values()
                ->map(fn($q) => [
                    'quiz_id'  => $q->id,
                    'title'    => $q->quiz_title,
                    'score'    => $q->score,
                    'max_score' => $q->max_score,
                    'color'    => $q->score >= 80 ? 'emerald' : ($q->score >= 50 ? 'amber' : 'blue'),
                ]),
            'daily_challenges' => [
                [
                    'id'                 => 1,
                    'title'              => 'Selesaikan 1 Modul Pembelajaran',
                    'target'             => 1,
                    'current'            => $completedCount > 0 ? 1 : 0,
                    'progress_percentage' => $completedCount > 0 ? 100 : 0,
                    'reward_text'        => '+100 XP',
                    'reward_icon'        => '⭐',
                ],
            ],
            'leaderboard' => $leaderboard,
        ];

        return response()->json([
            'status'  => 'success',
            'message' => 'Data Dashboard Berhasil Diambil',
            'data'    => $data,
        ]);
    }
}
