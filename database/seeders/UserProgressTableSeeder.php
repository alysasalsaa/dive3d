<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserProgressTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('user_progress')->delete();
        
        \DB::table('user_progress')->insert(array (
            0 => 
            array (
                'id' => 2,
                'user_id' => 1,
                'module_id' => 2,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 01:34:06',
                'updated_at' => '2026-05-04 01:34:06',
            ),
            1 => 
            array (
                'id' => 4,
                'user_id' => 1,
                'module_id' => 4,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 01:34:21',
                'updated_at' => '2026-05-04 01:34:21',
            ),
            2 => 
            array (
                'id' => 6,
                'user_id' => 2,
                'module_id' => 2,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 01:36:50',
                'updated_at' => '2026-05-04 01:36:50',
            ),
            3 => 
            array (
                'id' => 7,
                'user_id' => 2,
                'module_id' => 3,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 01:36:56',
                'updated_at' => '2026-05-04 01:36:56',
            ),
            4 => 
            array (
                'id' => 8,
                'user_id' => 2,
                'module_id' => 4,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 01:37:02',
                'updated_at' => '2026-05-04 01:37:02',
            ),
            5 => 
            array (
                'id' => 9,
                'user_id' => 3,
                'module_id' => 1,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 01:37:38',
                'updated_at' => '2026-05-04 01:37:38',
            ),
            6 => 
            array (
                'id' => 10,
                'user_id' => 3,
                'module_id' => 2,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 01:37:45',
                'updated_at' => '2026-05-04 01:37:45',
            ),
            7 => 
            array (
                'id' => 11,
                'user_id' => 3,
                'module_id' => 3,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 01:37:52',
                'updated_at' => '2026-05-04 01:37:52',
            ),
            8 => 
            array (
                'id' => 12,
                'user_id' => 3,
                'module_id' => 4,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 01:37:59',
                'updated_at' => '2026-05-04 01:37:59',
            ),
            9 => 
            array (
                'id' => 1,
                'user_id' => 1,
                'module_id' => 1,
                'visited_pois' => '["poi-1","poi-2","poi-3"]',
                'completed' => true,
                'created_at' => '2026-05-04 01:34:00',
                'updated_at' => '2026-05-04 01:46:39',
            ),
            10 => 
            array (
                'id' => 13,
                'user_id' => 6,
                'module_id' => 1,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 02:41:05',
                'updated_at' => '2026-05-04 02:41:05',
            ),
            11 => 
            array (
                'id' => 19,
                'user_id' => 6,
                'module_id' => 2,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 02:41:40',
                'updated_at' => '2026-05-04 02:41:40',
            ),
            12 => 
            array (
                'id' => 22,
                'user_id' => 6,
                'module_id' => 3,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 02:41:54',
                'updated_at' => '2026-05-04 02:41:54',
            ),
            13 => 
            array (
                'id' => 24,
                'user_id' => 6,
                'module_id' => 4,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 02:42:07',
                'updated_at' => '2026-05-04 02:42:07',
            ),
            14 => 
            array (
                'id' => 5,
                'user_id' => 2,
                'module_id' => 1,
                'visited_pois' => '[]',
                'completed' => true,
                'created_at' => '2026-05-04 01:36:44',
                'updated_at' => '2026-05-04 02:44:29',
            ),
            15 => 
            array (
                'id' => 3,
                'user_id' => 1,
                'module_id' => 3,
                'visited_pois' => '[]',
                'completed' => true,
                'created_at' => '2026-05-04 01:34:15',
                'updated_at' => '2026-05-04 02:44:50',
            ),
        ));
        
        
    }
}