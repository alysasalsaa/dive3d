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
                'id' => 1,
                'user_id' => 1,
                'module_id' => 1,
                'visited_pois' => '["poi-1","poi-2","poi-3"]',
                'completed' => true,
                'created_at' => '2026-05-04 01:34:00',
                'updated_at' => '2026-05-04 01:46:39',
            ),
            3 => 
            array (
                'id' => 13,
                'user_id' => 6,
                'module_id' => 1,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 02:41:05',
                'updated_at' => '2026-05-04 02:41:05',
            ),
            4 => 
            array (
                'id' => 19,
                'user_id' => 6,
                'module_id' => 2,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 02:41:40',
                'updated_at' => '2026-05-04 02:41:40',
            ),
            5 => 
            array (
                'id' => 22,
                'user_id' => 6,
                'module_id' => 3,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 02:41:54',
                'updated_at' => '2026-05-04 02:41:54',
            ),
            6 => 
            array (
                'id' => 24,
                'user_id' => 6,
                'module_id' => 4,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 02:42:07',
                'updated_at' => '2026-05-04 02:42:07',
            ),
            7 => 
            array (
                'id' => 3,
                'user_id' => 1,
                'module_id' => 3,
                'visited_pois' => '[]',
                'completed' => true,
                'created_at' => '2026-05-04 01:34:15',
                'updated_at' => '2026-05-04 02:44:50',
            ),
            8 => 
            array (
                'id' => 35,
                'user_id' => 8,
                'module_id' => 3,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 03:10:28',
                'updated_at' => '2026-05-04 03:10:28',
            ),
            9 => 
            array (
                'id' => 36,
                'user_id' => 8,
                'module_id' => 4,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 03:10:32',
                'updated_at' => '2026-05-04 03:10:32',
            ),
            10 => 
            array (
                'id' => 38,
                'user_id' => 12,
                'module_id' => 2,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 03:21:46',
                'updated_at' => '2026-05-04 03:21:46',
            ),
            11 => 
            array (
                'id' => 39,
                'user_id' => 12,
                'module_id' => 3,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 03:21:57',
                'updated_at' => '2026-05-04 03:21:57',
            ),
            12 => 
            array (
                'id' => 40,
                'user_id' => 12,
                'module_id' => 4,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 03:22:05',
                'updated_at' => '2026-05-04 03:22:05',
            ),
            13 => 
            array (
                'id' => 33,
                'user_id' => 8,
                'module_id' => 1,
                'visited_pois' => '[]',
                'completed' => true,
                'created_at' => '2026-05-04 03:10:18',
                'updated_at' => '2026-05-04 03:33:19',
            ),
            14 => 
            array (
                'id' => 37,
                'user_id' => 12,
                'module_id' => 1,
                'visited_pois' => '[]',
                'completed' => true,
                'created_at' => '2026-05-04 03:21:37',
                'updated_at' => '2026-05-04 06:12:03',
            ),
            15 => 
            array (
                'id' => 34,
                'user_id' => 8,
                'module_id' => 2,
                'visited_pois' => '[]',
                'completed' => true,
                'created_at' => '2026-05-04 03:10:23',
                'updated_at' => '2026-05-04 06:18:50',
            ),
            16 => 
            array (
                'id' => 45,
                'user_id' => 14,
                'module_id' => 1,
                'visited_pois' => '[]',
                'completed' => true,
                'created_at' => '2026-05-04 06:31:45',
                'updated_at' => '2026-05-04 06:32:55',
            ),
            17 => 
            array (
                'id' => 49,
                'user_id' => 15,
                'module_id' => 4,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 07:22:06',
                'updated_at' => '2026-05-04 07:22:06',
            ),
            18 => 
            array (
                'id' => 50,
                'user_id' => 15,
                'module_id' => 1,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 07:22:26',
                'updated_at' => '2026-05-04 07:22:26',
            ),
            19 => 
            array (
                'id' => 51,
                'user_id' => 15,
                'module_id' => 2,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 07:22:40',
                'updated_at' => '2026-05-04 07:22:40',
            ),
            20 => 
            array (
                'id' => 52,
                'user_id' => 15,
                'module_id' => 3,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-04 07:22:51',
                'updated_at' => '2026-05-04 07:22:51',
            ),
            21 => 
            array (
                'id' => 53,
                'user_id' => 16,
                'module_id' => 1,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-07 16:52:33',
                'updated_at' => '2026-05-07 16:52:33',
            ),
            22 => 
            array (
                'id' => 54,
                'user_id' => 16,
                'module_id' => 2,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-07 16:52:38',
                'updated_at' => '2026-05-07 16:52:38',
            ),
            23 => 
            array (
                'id' => 55,
                'user_id' => 16,
                'module_id' => 3,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-07 16:52:50',
                'updated_at' => '2026-05-07 16:52:50',
            ),
            24 => 
            array (
                'id' => 56,
                'user_id' => 16,
                'module_id' => 4,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-07 16:52:55',
                'updated_at' => '2026-05-07 16:52:55',
            ),
            25 => 
            array (
                'id' => 57,
                'user_id' => 23,
                'module_id' => 1,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-08 02:32:12',
                'updated_at' => '2026-05-08 02:32:12',
            ),
            26 => 
            array (
                'id' => 58,
                'user_id' => 23,
                'module_id' => 2,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-08 02:32:20',
                'updated_at' => '2026-05-08 02:32:20',
            ),
            27 => 
            array (
                'id' => 59,
                'user_id' => 23,
                'module_id' => 3,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-08 02:32:28',
                'updated_at' => '2026-05-08 02:32:28',
            ),
            28 => 
            array (
                'id' => 60,
                'user_id' => 23,
                'module_id' => 4,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-08 02:32:36',
                'updated_at' => '2026-05-08 02:32:36',
            ),
            29 => 
            array (
                'id' => 61,
                'user_id' => 24,
                'module_id' => 1,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-08 11:59:40',
                'updated_at' => '2026-05-08 11:59:40',
            ),
            30 => 
            array (
                'id' => 62,
                'user_id' => 24,
                'module_id' => 2,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-08 11:59:48',
                'updated_at' => '2026-05-08 11:59:48',
            ),
            31 => 
            array (
                'id' => 63,
                'user_id' => 24,
                'module_id' => 3,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-08 11:59:55',
                'updated_at' => '2026-05-08 11:59:55',
            ),
            32 => 
            array (
                'id' => 64,
                'user_id' => 24,
                'module_id' => 4,
                'visited_pois' => '[]',
                'completed' => false,
                'created_at' => '2026-05-08 12:00:03',
                'updated_at' => '2026-05-08 12:00:03',
            ),
            33 => 
            array (
                'id' => 46,
                'user_id' => 14,
                'module_id' => 2,
                'visited_pois' => '[]',
                'completed' => true,
                'created_at' => '2026-05-04 06:32:04',
                'updated_at' => '2026-05-08 12:57:32',
            ),
            34 => 
            array (
                'id' => 47,
                'user_id' => 14,
                'module_id' => 3,
                'visited_pois' => '[]',
                'completed' => true,
                'created_at' => '2026-05-04 06:32:21',
                'updated_at' => '2026-05-08 12:59:33',
            ),
            35 => 
            array (
                'id' => 48,
                'user_id' => 14,
                'module_id' => 4,
                'visited_pois' => '[]',
                'completed' => true,
                'created_at' => '2026-05-04 06:32:43',
                'updated_at' => '2026-05-08 13:00:14',
            ),
        ));
        
        
    }
}