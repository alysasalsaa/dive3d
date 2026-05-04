<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Quiz;
use App\Models\Question;
use App\Models\Answer;

class QuizDataSeeder extends Seeder
{
    public function run()
    {
        $quizzesData = [
            // ================== MODUL 1 ==================
            [
                'title' => 'Kuis Modul 1 – Ekosistem Laut',
                'description' => 'Evaluasi pemahaman tentang ekosistem laut, komponen biotik abiotik, dan rantai makanan.',
                'questions' => [
                    ['text' => 'Ekosistem laut adalah...', 
                    'difficulty' => 'Mudah', 
                    'answers' => [['Kumpulan ikan di laut', false], 
                    ['Interaksi makhluk hidup dengan lingkungan laut', true], 
                    ['Laut yang luas dan dalam', false], 
                    ['Tempat hidup manusia di laut', false]]],
                    
                    ['text' => 'Contoh interaksi dalam ekosistem laut adalah...', 
                    'difficulty' => 'Sulit', 
                    'answers' => [['Air laut menguap', false], 
                    ['Ikan memakan plankton', true], 
                    ['Pasir di dasar laut', false], 
                    ['Ombak laut', false]]],

                    //Komponen Biotik dan Abiotik
                    ['text' => 'Yang termasuk komponen biotik adalah...', 
                    'difficulty' => 'Mudah', 
                    'answers' => [['Air laut', false], 
                    ['Cahaya matahari', false], 
                    ['Ikan', true], 
                    ['Suhu', false]]],

                    ['text' => 'Komponen abiotik yang memengaruhi kehidupan biota laut adalah...', 
                    'difficulty' => 'Sulit', 
                    'answers' => [['Karang', false], 
                    ['Ikan', false], 
                    ['Salinitas', true], 
                    ['Plankton', false]]],

                    //Rantai Makanan Laut
                    ['text' => 'Urutan rantai makanan yang benar adalah...', 
                    'difficulty' => 'Mudah', 
                    'answers' => [['Ikan besar → plankton → ikan kecil', false], 
                    ['Fitoplankton → zooplankton → ikan kecil', true], 
                    ['Ikan kecil → plankton → paus', false], 
                    ['Hiu → plankton → ikan kecil', false]]],

                    ['text' => 'Dampak overfishing terhadap rantai makanan adalah...', 
                    'difficulty' => 'Sulit', 
                    'answers' => [['Menambah jumlah ikan', false], 
                    ['Tidak berpengaruh', false], 
                    ['Mengganggu keseimbangan ekosistem', true], 
                    ['Menambah plankton', false]]],]
            ],
            // ================== MODUL 2 ==================
            [
                'title' => 'Kuis Modul 2 – Biota Laut',
                'description' => 'Evaluasi pemahaman tentang jenis, pengelompokan, dan peran biota laut.',
                'questions' => [
                    ['text' => 'Contoh biota laut adalah...', 
                    'difficulty' => 'Mudah', 
                    'answers' => [['Ayam', false], 
                    ['Kucing', false], 
                    ['Clownfish', true], 
                    ['Sapi', false]]],

                    ['text' => 'Hewan laut yang termasuk mamalia adalah...', 
                    'difficulty' => 'Sulit', 
                    'answers' => [['Ikan pari', false], 
                    ['Paus', true], ['Udang', false], 
                    ['Karang', false]]],
                    
                    //Pengelompokan Biota Laut
                    ['text' => 'Kima raksasa termasuk kelompok...', 
                    'difficulty' => 'Mudah', 
                    'answers' => [['Ikan', false], 
                    ['Mamalia', false], 
                    ['Moluska', true], 
                    ['Reptil', false]]],
                    
                    ['text' => 'Pengelompokan biota laut berdasarkan karakteristik bertujuan untuk...', 
                    'difficulty' => 'Sulit', 
                    'answers' => [['Memperindah laut', false], 
                    ['Memudahkan memahami ekosistem', true], 
                    ['Mengurangi jumlah biota', false], 
                    ['Mengubah habitat', false]]],
                    
                    //Peran Biota Laut
                    ['text' => 'Peran ikan dalam ekosistem laut adalah...', 
                    'difficulty' => 'Mudah', 
                    'answers' => [['Mengotori laut', false], 
                    ['Menjaga keseimbangan ekosistem', true], 
                    ['Menghancurkan karang', false], 
                    ['Mengurangi air laut', false]]],
                    
                    ['text' => 'Jika salah satu biota laut punah, maka yang terjadi adalah...', 
                    'difficulty' => 'Sulit', 
                    'answers' => [['Ekosistem tetap stabil', false], 
                    ['Tidak ada perubahan', false], 
                    ['Keseimbangan ekosistem terganggu', true], 
                    ['Laut menjadi jernih', false]]],
                ]
            ],
            // ================== MODUL 3 ==================
            [
                'title' => 'Kuis Modul 3 – Terumbu Karang',
                'description' => 'Evaluasi pemahaman tentang terumbu karang, fungsi, dan kerusakannya.',
                'questions' => [
                    //Pengertian Terumbu Karang
                    ['text' => 'Terumbu karang adalah...', 
                    'difficulty' => 'Mudah', 
                    'answers' => [['Batu biasa di laut', false], 
                    ['Struktur dari organisme karang', true], 
                    ['Pasir laut', false], 
                    ['Lumpur laut', false]]],

                    ['text' => 'Terumbu karang terbentuk dari...', 
                    'difficulty' => 'Sulit', 
                    'answers' => [['Pasir laut', false], 
                    ['Kalsium karbonat dari organisme karang', true], 
                    ['Air laut', false], ['Lumpur', false]]],

                    //Fungsi Terumbu Karang
                    ['text' => 'Fungsi terumbu karang adalah...', 
                    'difficulty' => 'Mudah', 
                    'answers' => [['Mengotori laut', false], 
                    ['Tempat hidup biota laut', true], 
                    ['Mengurangi air laut', false], 
                    ['Menambah sampah', false]]],

                    ['text' => 'Terumbu karang membantu melindungi pantai dengan cara...', 
                    'difficulty' => 'Sulit', 
                    'answers' => [['Menambah ombak', false], 
                    ['Menahan gelombang laut', true], 
                    ['Mengurangi ikan', false], 
                    ['Menambah pasir', false]]],

                    //Kerusakan Terumbu Karang
                    ['text' => 'Salah satu penyebab kerusakan terumbu karang adalah...', 
                    'difficulty' => 'Mudah', 
                    'answers' => [['Menanam mangrove', false], 
                    ['Overfishing', true], 
                    ['Membersihkan laut', false], 
                    ['Konservasi', false]]],

                    ['text' => 'Coral bleaching disebabkan oleh...', 
                    'difficulty' => 'Sulit', 
                    'answers' => [['Hujan', false], 
                    ['Perubahan iklim', true], 
                    ['Angin', false], 
                    ['Pasir', false]]],
                ]
            ],
            // ================== MODUL 4 ==================
            [
                'title' => 'Kuis Modul 4 – Sampah Laut',
                'description' => 'Evaluasi pemahaman tentang jenis, dampak, dan cara mengurangi sampah laut.',
                'questions' => [
                    ['text' => 'Contoh sampah laut adalah...', 
                    'difficulty' => 'Mudah', 
                    'answers' => [['Plastik', true], 
                    ['Air', false], ['Ikan', false], 
                    ['Garam', false]]],

                    ['text' => 'Sampah yang sulit terurai di laut adalah...', 
                    'difficulty' => 'Sulit', 
                    'answers' => [['Daun', false], 
                    ['Plastik', true], 
                    ['Kayu', false], 
                    ['Kertas', false]]],

                    //
                    ['text' => 'Sampah laut dapat menyebabkan...', 
                    'difficulty' => 'Mudah', 
                    'answers' => [['Laut bersih', false], 
                    ['Hewan laut mati', true], 
                    ['Air bertambah', false], 
                    ['Ikan bertambah', false]]],

                    ['text' => 'Mikroplastik berbahaya karena...', 
                    'difficulty' => 'Sulit', 
                    'answers' => [['Mudah terlihat', false], 
                    ['Masuk ke rantai makanan', true], 
                    ['Cepat hilang', false], 
                    ['Tidak berbahaya', false]]],

                    //
                    ['text' => 'Cara mengurangi sampah laut adalah...', 
                    'difficulty' => 'Mudah', 
                    'answers' => [['Membuang sampah ke laut', false], 
                    ['Menggunakan plastik sekali pakai', false], 
                    ['Daur ulang', true], 
                    ['Membakar laut', false]]],
                    ['text' => 'Upaya efektif mengurangi sampah laut adalah...', 
                    'difficulty' => 'Sulit', 
                    'answers' => [['Menambah plastik', false], 
                    ['Edukasi dan pengelolaan sampah', true], 
                    ['Membuang ke sungai', false], 
                    ['Membiarkan saja', false]]],
                ]
            ],
        ];

        foreach ($quizzesData as $quizData) {
            $quiz = Quiz::create([
                'title' => $quizData['title'],
                'description' => $quizData['description'],
            ]);

            foreach ($quizData['questions'] as $qData) {
                $question = Question::create([
                    'quiz_id' => $quiz->id,
                    'question_text' => $qData['text'],
                    'difficulty' => $qData['difficulty'],
                ]);

                foreach ($qData['answers'] as $ansData) {
                    Answer::create([
                        'question_id' => $question->id,
                        'answer_text' => $ansData[0],
                        'is_correct' => $ansData[1],
                    ]);
                }
            }
        }
    }
}