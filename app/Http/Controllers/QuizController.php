<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\QuizResult;

class QuizController extends Controller
{
    /**
     * POST /api/quiz/submit
     * Simpan hasil quiz user ke database.
     */
    public function submit(Request $request)
    {
        $request->validate([
            'quiz_title' => 'required|string|max:255',
            'score'      => 'required|integer|min:0',
            'max_score'  => 'integer|min:1',
        ]);

        $result = QuizResult::create([
            'user_id'    => auth()->id(),
            'quiz_title' => $request->quiz_title,
            'score'      => $request->score,
            'max_score'  => $request->max_score ?? 100,
        ]);

        return response()->json([
            'message' => 'Hasil quiz berhasil disimpan.',
            'data'    => $result,
        ]);
    }
}
