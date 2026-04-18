<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Module;


class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //public function run(): void
        {
            // Modul 1
            Module::create([
                'slug' => 'terumbu-karang',
                'title' => 'Ekosistem Terumbu Karang',
                'long_description' => 'Pelajari struktur dan pentingnya ekosistem terumbu karang sebagai rumah bagi ribuan spesies laut di Raja Ampat.',
                'icon' => '🪸',
                'difficulty' => 'Pemula',
                'estimated_time' => '15 menit',
                'gradient_from' => '#06b6d4',
                'gradient_to' => '#3b82f6',
                'model_url' => '/models/usnm_74016-100k-2048-gltf_std/usnm_74016-100k-2048.gltf',
            ]);
            // Modul 2
            Module::create([
                'slug' => 'keanekaragaman-laut',
                'title' => 'Keanekaragaman Hayati Laut',
                'long_description' => 'Eksplorasi ragam spesies ikan, moluska, dan invertebrata yang menghuni perairan Raja Ampat yang kaya.',
                'icon' => '🐠',
                'difficulty' => 'Menengah',
                'estimated_time' => '20 menit',
                'gradient_from' => '#10b981',
                'gradient_to' => '#06b6d4',
                'model_url' => '/models/usnm_74016-100k-2048-gltf_std/usnm_74016-100k-2048.gltf',
            ]);
            // Modul 3: Ancaman Lingkungan
            Module::create([
                'slug' => 'ancaman-lingkungan',
                'title' => 'Ancaman Lingkungan Laut',
                'long_description' => 'Pahami dampak perubahan iklim, pemutihan karang, dan polusi terhadap ekosistem laut yang rapuh.',
                'icon' => '⚠️',
                'difficulty' => 'Lanjutan',
                'estimated_time' => '18 menit',
                'gradient_from' => '#f59e0b',
                'gradient_to' => '#ef4444',
                'model_url' => '/models/usnm_74016-100k-2048-gltf_std/usnm_74016-100k-2048.gltf',
            ]);

            // Modul 4: Aksi Konservasi
            Module::create([
                'slug' => 'konservasi-aksi',
                'title' => 'Aksi Konservasi Nyata',
                'long_description' => 'Temukan cara nyata untuk berkontribusi pada pelestarian laut: dari penyelaman ramah lingkungan hingga program adopsi terumbu karang.',
                'icon' => '💚',
                'difficulty' => 'Pemula',
                'estimated_time' => '15 menit',
                'gradient_from' => '#8b5cf6',
                'gradient_to' => '#ec4899',
                'model_url' => '/models/usnm_74016-100k-2048-gltf_std/usnm_74016-100k-2048.gltf',
            ]);
        }
    }
}
