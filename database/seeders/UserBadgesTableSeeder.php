<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserBadgesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('user_badges')->delete();
        
        \DB::table('user_badges')->insert(array (
            0 => 
            array (
                'id' => 1,
                'user_id' => 1,
                'badge_id' => 1,
                'earned_at' => '2026-05-04 01:46:41',
                'created_at' => '2026-05-04 01:46:41',
                'updated_at' => '2026-05-04 01:46:41',
            ),
            1 => 
            array (
                'id' => 5,
                'user_id' => 8,
                'badge_id' => 1,
                'earned_at' => '2026-05-04 03:33:21',
                'created_at' => '2026-05-04 03:33:21',
                'updated_at' => '2026-05-04 03:33:21',
            ),
            2 => 
            array (
                'id' => 6,
                'user_id' => 12,
                'badge_id' => 1,
                'earned_at' => '2026-05-04 06:12:06',
                'created_at' => '2026-05-04 06:12:06',
                'updated_at' => '2026-05-04 06:12:06',
            ),
            3 => 
            array (
                'id' => 7,
                'user_id' => 14,
                'badge_id' => 1,
                'earned_at' => '2026-05-04 06:32:58',
                'created_at' => '2026-05-04 06:32:58',
                'updated_at' => '2026-05-04 06:32:58',
            ),
            4 => 
            array (
                'id' => 8,
                'user_id' => 14,
                'badge_id' => 4,
                'earned_at' => '2026-05-08 12:59:34',
                'created_at' => '2026-05-08 12:59:34',
                'updated_at' => '2026-05-08 12:59:34',
            ),
        ));
        
        
    }
}