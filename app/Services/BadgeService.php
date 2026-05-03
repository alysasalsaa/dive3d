<?php

namespace App\Services;

use App\Models\Badge;
use App\Models\UserBadge;
use App\Models\UserProgress;

class BadgeService
{
    /**
     * Cek apakah user baru unlock badge setelah progress diupdate.
     * Kembalikan array badge yang baru diraih (kosong jika tidak ada).
     */
    public function checkAndAward(int $userId): array
    {
        $earnedIds = UserBadge::where('user_id', $userId)->pluck('badge_id');
        $unearned  = Badge::whereNotIn('id', $earnedIds)->get();

        if ($unearned->isEmpty()) {
            return [];
        }

        $completedModules = UserProgress::where('user_id', $userId)
            ->where('completed', true)
            ->count();

        $totalPois = UserProgress::where('user_id', $userId)
            ->get()
            ->sum(fn($p) => count($p->visited_pois ?? []));

        $newBadges = [];

        foreach ($unearned as $badge) {
            $met = match ($badge->criteria_type) {
                'modules_completed' => $completedModules >= $badge->criteria_value,
                'pois_visited'      => $totalPois >= $badge->criteria_value,
                default             => false,
            };

            if ($met) {
                UserBadge::create([
                    'user_id'   => $userId,
                    'badge_id'  => $badge->id,
                    'earned_at' => now(),
                ]);
                $newBadges[] = $badge;
            }
        }

        return $newBadges;
    }
}
