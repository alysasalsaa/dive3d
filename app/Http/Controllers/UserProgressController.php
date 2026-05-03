<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserProgress;
use App\Models\Module;
use App\Services\BadgeService;

class UserProgressController extends Controller
{
    public function show($slug)
    {
        $module = Module::where('slug', $slug)->firstOrFail();

        $progress = UserProgress::firstOrCreate(
            ['user_id' => auth()->id(), 'module_id' => $module->id],
            ['visited_pois' => [], 'completed' => false]
        );

        return response()->json([
            'moduleId'    => $module->slug,
            'visitedPois' => $progress->visited_pois ?? [],
            'completed'   => $progress->completed
        ]);
    }

    public function update(Request $request, BadgeService $badgeService)
    {
        $request->validate([
            'moduleId'    => 'required|string',
            'visitedPois' => 'required|array',
            'completed'   => 'required|boolean'
        ]);

        $module = Module::where('slug', $request->moduleId)->firstOrFail();

        $progress = UserProgress::updateOrCreate(
            ['user_id' => auth()->id(), 'module_id' => $module->id],
            [
                'visited_pois' => $request->visitedPois,
                'completed'    => $request->completed
            ]
        );

        $newBadges = $badgeService->checkAndAward(auth()->id());

        return response()->json([
            'message'    => 'Progres berhasil disimpan.',
            'data'       => $progress,
            'new_badges' => $newBadges,
        ]);
    }
}
