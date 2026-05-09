<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class BadgesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('badges')->delete();
        
        \DB::table('badges')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Penyelam Pertama',
                'description' => 'Selesaikan modul pertamamu.',
                'icon' => '🤿',
                'criteria_type' => 'modules_completed',
                'criteria_value' => 1,
                'created_at' => '2026-05-04 02:33:50',
                'updated_at' => '2026-05-04 02:33:50',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Penjelajah Terumbu',
                'description' => 'Kunjungi 5 titik POI dari berbagai modul.',
                'icon' => '🔍',
                'criteria_type' => 'pois_visited',
                'criteria_value' => 5,
                'created_at' => '2026-05-04 02:33:50',
                'updated_at' => '2026-05-04 02:33:50',
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Penjelajah Berpengalaman',
                'description' => 'Kunjungi 20 titik POI dari berbagai modul.',
                'icon' => '🌊',
                'criteria_type' => 'pois_visited',
                'criteria_value' => 20,
                'created_at' => '2026-05-04 02:33:51',
                'updated_at' => '2026-05-04 02:33:51',
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'Master Penyelam',
                'description' => 'Selesaikan 3 modul pembelajaran.',
                'icon' => '🏆',
                'criteria_type' => 'modules_completed',
                'criteria_value' => 3,
                'created_at' => '2026-05-04 02:33:51',
                'updated_at' => '2026-05-04 02:33:51',
            ),
        ));
        
        
    }
}