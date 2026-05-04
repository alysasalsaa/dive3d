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
                'id' => 1,
                'user_id' => 2,
                'quiz_title' => 'Kuis: Ekosistem Terumbu Karang',
                'score' => 100,
                'max_score' => 100,
                'created_at' => '2026-05-04 01:40:37',
                'updated_at' => '2026-05-04 01:40:37',
            ),
            1 => 
            array (
                'id' => 5,
                'user_id' => 1,
                'quiz_title' => 'Kuis: Keanekaragaman Hayati Laut',
                'score' => 100,
                'max_score' => 100,
                'created_at' => '2026-05-04 02:43:10',
                'updated_at' => '2026-05-04 02:43:10',
            ),
        ));
        
        
    }
}