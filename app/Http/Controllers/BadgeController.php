<?php

namespace App\Http\Controllers;

use App\Models\Badge;
use App\Models\UserBadge;
use Illuminate\Http\Request;

class BadgeController extends Controller
{
    /**
     * GET /api/badges
     * Semua badge + status earned/not earned untuk user yang login.
     */
    public function index(Request $request)
    {
        $userId    = auth()->id();
        $earnedMap = UserBadge::where('user_id', $userId)
            ->pluck('earned_at', 'badge_id');

        $badges = Badge::all()->map(function ($badge) use ($earnedMap) {
            return [
                'id'             => $badge->id,
                'name'           => $badge->name,
                'description'    => $badge->description,
                'icon'           => $badge->icon,
                'criteria_type'  => $badge->criteria_type,
                'criteria_value' => $badge->criteria_value,
                'earned'         => $earnedMap->has($badge->id),
                'earned_at'      => $earnedMap->get($badge->id),
            ];
        });

        return response()->json(['data' => $badges]);
    }

    /**
     * GET /api/badges/my
     * Hanya badge yang sudah diraih user yang login.
     */
    public function my(Request $request)
    {
        $badges = UserBadge::with('badge')
            ->where('user_id', auth()->id())
            ->orderBy('earned_at', 'desc')
            ->get()
            ->map(fn($ub) => [
                'id'          => $ub->badge->id,
                'name'        => $ub->badge->name,
                'description' => $ub->badge->description,
                'icon'        => $ub->badge->icon,
                'earned_at'   => $ub->earned_at,
            ]);

        return response()->json(['data' => $badges]);
    }
}
