<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    /**
     * Mengambil daftar soal kuis berdasarkan slug (TANPA kunci jawaban)
     */
    public function show($slug)
    {
        // Cari berdasarkan title yang mengandung kata/modul tersebut.
        $searchKeyword = str_replace('-', ' ', $slug);
        
        $quiz = Quiz::with(['questions.answers' => function ($query) {
            // HANYA ambil id, question_id, dan teks jawaban.
            // JANGAN bawa 'is_correct' agar tidak bocor ke frontend!
            $query->select('id', 'question_id', 'answer_text'); 
        }])
        ->where('title', 'ILIKE', '%' . $searchKeyword . '%') 
        ->first();

        if (!$quiz) {
            return response()->json(['message' => 'Kuis tidak ditemukan'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $quiz
        ]);
    }

    /**
     * Menerima jawaban dari frontend, mencocokkan dengan database, dan menghitung skor
     */
    public function submit(Request $request)
    {
        // Validasi input dari frontend
        $request->validate([
            'quiz_id' => 'required|exists:quizzes,id',
            'answers' => 'required|array', // Format yang diharapkan: [ question_id => answer_id, ... ]
        ]);

        $quizId = $request->quiz_id;
        $userAnswers = $request->answers; 

        $score = 0;
        $totalQuestions = count($userAnswers);

        // Loop setiap jawaban user dan cek ke database
        foreach ($userAnswers as $questionId => $answerId) {
            $isCorrect = Answer::where('id', $answerId)
                ->where('question_id', $questionId)
                ->where('is_correct', true)
                ->exists();

            if ($isCorrect) {
                $score++;
            }
        }

        // Hitung nilai akhir (0-100)
        $finalScore = ($totalQuestions > 0) ? round(($score / $totalQuestions) * 100) : 0;

        // Tentukan pesan kelulusan (Batas lulus = 70)
        $passed = $finalScore >= 70;
        $message = $passed ? 'Selamat! Anda Lulus Kuis Ini.' : 'Maaf, nilai Anda belum cukup. Silakan coba lagi!';

        // Kembalikan hasil ke Frontend
        return response()->json([
            'success' => true,
            'score' => $finalScore,
            'passed' => $passed,
            'message' => $message
        ]);
    }
}