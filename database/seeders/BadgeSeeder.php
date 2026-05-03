<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Badge;

class BadgeSeeder extends Seeder
{
    public function run(): void
    {
        $badges = [
            [
                'name'           => 'Penyelam Pertama',
                'description'    => 'Selesaikan modul pertamamu.',
                'icon'           => '🤿',
                'criteria_type'  => 'modules_completed',
                'criteria_value' => 1,
            ],
            [
                'name'           => 'Penjelajah Terumbu',
                'description'    => 'Kunjungi 5 titik POI dari berbagai modul.',
                'icon'           => '🔍',
                'criteria_type'  => 'pois_visited',
                'criteria_value' => 5,
            ],
            [
                'name'           => 'Penjelajah Berpengalaman',
                'description'    => 'Kunjungi 20 titik POI dari berbagai modul.',
                'icon'           => '🌊',
                'criteria_type'  => 'pois_visited',
                'criteria_value' => 20,
            ],
            [
                'name'           => 'Master Penyelam',
                'description'    => 'Selesaikan 3 modul pembelajaran.',
                'icon'           => '🏆',
                'criteria_type'  => 'modules_completed',
                'criteria_value' => 3,
            ],
        ];

        foreach ($badges as $badge) {
            Badge::firstOrCreate(
                ['name' => $badge['name']],
                $badge
            );
        }
    }
}
