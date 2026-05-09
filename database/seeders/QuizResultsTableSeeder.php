<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class QuizResultsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('quiz_results')->delete();
        
        \DB::table('quiz_results')->insert(array (
            0 => 
            array (
                'id' => 5,
                'user_id' => 1,
                'quiz_title' => 'Kuis: Keanekaragaman Hayati Laut',
                'score' => 100,
                'max_score' => 100,
                'created_at' => '2026-05-04 02:43:10',
                'updated_at' => '2026-05-04 02:43:10',
            ),
            1 => 
            array (
                'id' => 10,
                'user_id' => 8,
                'quiz_title' => 'Kuis: Ekosistem Terumbu Karang',
                'score' => 100,
                'max_score' => 100,
                'created_at' => '2026-05-04 03:33:17',
                'updated_at' => '2026-05-04 03:33:17',
            ),
            2 => 
            array (
                'id' => 13,
                'user_id' => 12,
                'quiz_title' => 'Kuis: Ekosistem Terumbu Karang',
                'score' => 100,
                'max_score' => 100,
                'created_at' => '2026-05-04 06:11:35',
                'updated_at' => '2026-05-04 06:11:35',
            ),
            3 => 
            array (
                'id' => 14,
                'user_id' => 8,
                'quiz_title' => 'Kuis: Keanekaragaman Hayati Laut',
                'score' => 50,
                'max_score' => 100,
                'created_at' => '2026-05-04 06:18:45',
                'updated_at' => '2026-05-04 06:18:45',
            ),
            4 => 
            array (
                'id' => 15,
                'user_id' => 8,
                'quiz_title' => 'Kuis: Keanekaragaman Hayati Laut',
                'score' => 67,
                'max_score' => 100,
                'created_at' => '2026-05-04 06:21:10',
                'updated_at' => '2026-05-04 06:21:10',
            ),
            5 => 
            array (
                'id' => 17,
                'user_id' => 14,
                'quiz_title' => 'Kuis: Ekosistem Terumbu Karang',
                'score' => 100,
                'max_score' => 100,
                'created_at' => '2026-05-04 06:32:32',
                'updated_at' => '2026-05-04 06:32:32',
            ),
            6 => 
            array (
                'id' => 18,
                'user_id' => 14,
                'quiz_title' => 'Kuis: Keanekaragaman Hayati Laut',
                'score' => 33,
                'max_score' => 100,
                'created_at' => '2026-05-04 06:34:09',
                'updated_at' => '2026-05-04 06:34:09',
            ),
            7 => 
            array (
                'id' => 19,
                'user_id' => 14,
                'quiz_title' => 'Kuis: Ekosistem Terumbu Karang',
                'score' => 100,
                'max_score' => 100,
                'created_at' => '2026-05-08 12:36:15',
                'updated_at' => '2026-05-08 12:36:15',
            ),
            8 => 
            array (
                'id' => 20,
                'user_id' => 14,
                'quiz_title' => 'Kuis: Keanekaragaman Hayati Laut',
                'score' => 50,
                'max_score' => 100,
                'created_at' => '2026-05-08 12:57:28',
                'updated_at' => '2026-05-08 12:57:28',
            ),
            9 => 
            array (
                'id' => 21,
                'user_id' => 14,
                'quiz_title' => 'Kuis: Keanekaragaman Hayati Laut',
                'score' => 100,
                'max_score' => 100,
                'created_at' => '2026-05-08 12:58:23',
                'updated_at' => '2026-05-08 12:58:23',
            ),
            10 => 
            array (
                'id' => 22,
                'user_id' => 14,
                'quiz_title' => 'Kuis: Ancaman Lingkungan Laut',
                'score' => 100,
                'max_score' => 100,
                'created_at' => '2026-05-08 12:59:30',
                'updated_at' => '2026-05-08 12:59:30',
            ),
            11 => 
            array (
                'id' => 23,
                'user_id' => 14,
                'quiz_title' => 'Kuis: Aksi Konservasi Nyata',
                'score' => 100,
                'max_score' => 100,
                'created_at' => '2026-05-08 13:00:11',
                'updated_at' => '2026-05-08 13:00:11',
            ),
            12 => 
            array (
                'id' => 24,
                'user_id' => 8,
                'quiz_title' => 'Kuis: Ekosistem Terumbu Karang',
                'score' => 83,
                'max_score' => 100,
                'created_at' => '2026-05-08 13:18:29',
                'updated_at' => '2026-05-08 13:18:29',
            ),
            13 => 
            array (
                'id' => 25,
                'user_id' => 8,
                'quiz_title' => 'Kuis: Ekosistem Terumbu Karang',
                'score' => 100,
                'max_score' => 100,
                'created_at' => '2026-05-08 13:21:16',
                'updated_at' => '2026-05-08 13:21:16',
            ),
            14 => 
            array (
                'id' => 26,
                'user_id' => 8,
                'quiz_title' => 'Kuis: Ekosistem Terumbu Karang',
                'score' => 100,
                'max_score' => 100,
                'created_at' => '2026-05-08 13:25:45',
                'updated_at' => '2026-05-08 13:25:45',
            ),
            15 => 
            array (
                'id' => 27,
                'user_id' => 8,
                'quiz_title' => 'Kuis: Ekosistem Terumbu Karang',
                'score' => 100,
                'max_score' => 100,
                'created_at' => '2026-05-08 13:27:23',
                'updated_at' => '2026-05-08 13:27:23',
            ),
        ));
        
        
    }
}