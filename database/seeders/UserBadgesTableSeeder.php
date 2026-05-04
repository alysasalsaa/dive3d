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
        ));
        
        
    }
}