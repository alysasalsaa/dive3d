<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PointOfInterest;

class PointOfInterestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ----------------------------------------------------
        // Menanam 3 Titik (POI) untuk Modul 1 (Terumbu Karang)
        // ----------------------------------------------------

        PointOfInterest::create([
            'module_id' => 1,
            'identifier' => 'poi-1',
            'label' => 'Polip Karang',
            'description' => 'Ini adalah unit dasar pembentuk terumbu karang. Jika Anda perhatikan, tentakel-tentakel kecilnya bergerak secara aktif untuk menangkap plankton yang lewat di dekatnya!',
            'position' => [0.5, 0.2, 0], // Sumbu Koordinat 3D
            'audio_url' => '/audio/polip-karang.mp3'
        ]);

        PointOfInterest::create([
            'module_id' => 1,
            'identifier' => 'poi-2',
            'label' => 'Zooxanthellae',
            'description' => 'Rahasia warna karang yang mempesona berasal dari alga simbiotik kecil ini. Mereka rajin berfotosintesis untuk menyuplai gula (makanan lezat) bagi sang terumbu karang.',
            'position' => [-0.3, 0.5, 0.2],
            'audio_url' => '/audio/zooxanthellae.mp3'
        ]);

        PointOfInterest::create([
            'module_id' => 1,
            'identifier' => 'poi-3',
            'label' => 'Rangka Kalsium',
            'description' => 'Ini adalah rangka keras berbahan kapur (Kalsium Karbonat). Struktur penyangga super keras inilah yang membuat karang mampu bertahan dari hantaman ombak samudra lepas.',
            'position' => [0, -0.3, 0.4],
            'audio_url' => '/audio/skeleton.mp3'
        ]);

        // (Anda bisa menambahkan data modul 2 dan 3 di kemudian hari)
    }
}
