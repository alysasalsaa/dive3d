<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\QuizQuestion;

class QuizQuestionController extends Controller
{
    /** GET /api/quiz/questions/{moduleSlug} */
    public function index($moduleSlug)
    {
        $questions = QuizQuestion::where('module_slug', $moduleSlug)
            ->get()
            ->map(fn($q) => [
                'id'             => $q->id,
                'question'       => $q->question,
                'option_a'       => $q->option_a,
                'option_b'       => $q->option_b,
                'option_c'       => $q->option_c,
                'option_d'       => $q->option_d,
                'correct_answer' => $q->correct_answer,
            ]);

        return response()->json(['data' => $questions]);
    }

    /** POST /api/quiz/questions  (admin) */
    public function store(Request $request)
    {
        $request->validate([
            'module_slug'    => 'required|string',
            'question'       => 'required|string',
            'option_a'       => 'required|string',
            'option_b'       => 'required|string',
            'option_c'       => 'required|string',
            'option_d'       => 'required|string',
            'correct_answer' => 'required|in:A,B,C,D',
        ]);

        $q = QuizQuestion::create($request->only([
            'module_slug', 'question',
            'option_a', 'option_b', 'option_c', 'option_d',
            'correct_answer',
        ]));

        return response()->json(['message' => 'Soal berhasil ditambahkan.', 'data' => $q], 201);
    }

    /** DELETE /api/quiz/questions/{id}  (admin) */
    public function destroy($id)
    {
        QuizQuestion::findOrFail($id)->delete();
        return response()->json(['message' => 'Soal berhasil dihapus.']);
    }
}
