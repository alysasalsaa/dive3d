<?php

namespace App\Http\Controllers\Api;

use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    /**
     * Get aggregate data for Dashboard.
     * 
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        // -------------------------------------------------------------
        // Ini adalah DUMMY DATA.
        // Nanti bisa Anda ganti dengan query dari database menggunakan Model
        // Contoh: $user = auth()->user(); $badges = Badge::where(...)->get();
        // -------------------------------------------------------------
        
        $data = [
            "user" => [
                "id" => 1,
                "name" => "Maulana Yudo Yudistira",
                "level" => 0,
                "rank_name" => "Rookie",
                "current_xp" => 2500,
                "next_level_xp" => 5000,
                "gems" => 500
            ],
            "badges" => [
                [ "id" => 1, "name" => "Pembelajar Cepat", "icon" => "⚡", "achieved" => true, "tooltip" => "Selesaikan modul lebih cepat 50%" ],
                [ "id" => 2, "name" => "Nilai Sempurna", "icon" => "🎯", "achieved" => true, "tooltip" => "Dapatkan 100 di kuis pertama" ],
                [ "id" => 3, "name" => "Login Beruntun 7 Hari", "icon" => "🔥", "achieved" => false, "tooltip" => "Login 7 hari berturut-turut" ]
            ],
            "learning_progress" => [
                [ "course_id" => 1, "title" => "Konservasi Terumbu Karang", "progress_percentage" => 45, "color" => "emerald" ],
                [ "course_id" => 2, "title" => "Pengenalan Biota Laut Dasar", "progress_percentage" => 20, "color" => "blue" ],
                [ "course_id" => 3, "title" => "Navigasi & Ekosistem Laut", "progress_percentage" => 10, "color" => "amber" ]
            ],
            "recent_quizzes" => [
                [ "quiz_id" => 1, "title" => "Kuis: Anatomi Terumbu Karang", "score" => 85, "color" => "emerald" ],
                [ "quiz_id" => 2, "title" => "Kuis: Fakta Ikan & Mamalia Laut", "score" => 90, "color" => "amber" ],
                [ "quiz_id" => 3, "title" => "Ujian Sertifikasi Penyelam 3D", "score" => 75, "color" => "blue" ]
            ],
            "leaderboard" => [
                [ "rank" => 1, "name" => "Rama Putra M.", "xp" => 4500, "avatar_emoji" => "👨" ],
                [ "rank" => 2, "name" => "Abyan Bergas I.", "xp" => 4200, "avatar_emoji" => "👨‍🦱" ],
                [ "rank" => 3, "name" => "Maulana Yudo Y.", "xp" => 2500, "avatar_emoji" => "👨" ]
            ],
            "daily_challenges" => [
                [ 
                    "id" => 1, 
                    "title" => "Selesaikan 2 Materi Video", 
                    "target" => 2, 
                    "current" => 1, 
                    "progress_percentage" => 50,
                    "reward_text" => "+150 Gems & 1 Mystery Box",
                    "reward_icon" => "💎"
                ],
                [ 
                    "id" => 2, 
                    "title" => "Dapatkan Skor Penuh di Kuis", 
                    "target" => 1, 
                    "current" => 0, 
                    "progress_percentage" => 0,
                    "reward_text" => "Lencana Emas Spesial",
                    "reward_icon" => "🌟"
                ]
            ]
        ];

        return response()->json([
            "status" => "success",
            "message" => "Data Dashboard Berhasil Diambil",
            "data" => $data
        ]);
    }
}
