<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PointOfInterest;
use App\Models\Module;

class PointOfInterestSeeder extends Seeder
{
    public function run(): void
    {
        $modulePois = [

            // =============================================
            // MODUL 1: Ekosistem Terumbu Karang
            // =============================================
            'terumbu-karang' => [
                [
                    'identifier'  => 'poi-1',
                    'label'       => 'Polip Karang',
                    'description' => 'Ini adalah unit dasar pembentuk terumbu karang. Jika Anda perhatikan, tentakel-tentakel kecilnya bergerak secara aktif untuk menangkap plankton yang lewat di dekatnya!',
                    'position'    => [0.5, 0.2, 0],
                    'audio_url'   => '/audio/polip-karang.mp3',
                ],
                [
                    'identifier'  => 'poi-2',
                    'label'       => 'Zooxanthellae',
                    'description' => 'Rahasia warna karang yang mempesona berasal dari alga simbiotik kecil ini. Mereka rajin berfotosintesis untuk menyuplai gula (makanan lezat) bagi sang terumbu karang.',
                    'position'    => [-0.3, 0.5, 0.2],
                    'audio_url'   => '/audio/zooxanthellae.mp3',
                ],
                [
                    'identifier'  => 'poi-3',
                    'label'       => 'Rangka Kalsium',
                    'description' => 'Ini adalah rangka keras berbahan kapur (Kalsium Karbonat). Struktur penyangga super keras inilah yang membuat karang mampu bertahan dari hantaman ombak samudra lepas.',
                    'position'    => [0, -0.3, 0.4],
                    'audio_url'   => '/audio/skeleton.mp3',
                ],
            ],

            // =============================================
            // MODUL 2: Keanekaragaman Hayati Laut
            // =============================================
            'keanekaragaman-laut' => [
                [
                    'identifier'  => 'poi-1',
                    'label'       => 'Ikan Karang',
                    'description' => 'Ribuan spesies ikan berwarna-warni menghuni terumbu karang Raja Ampat. Mereka memainkan peran penting dalam menjaga keseimbangan rantai makanan dan kesehatan ekosistem karang.',
                    'position'    => [0.4, 0.3, 0],
                    'audio_url'   => '/audio/ikan-karang.mp3',
                ],
                [
                    'identifier'  => 'poi-2',
                    'label'       => 'Moluska',
                    'description' => 'Gurita, cumi-cumi, dan kerang adalah contoh moluska yang menghuni perairan Raja Ampat. Hewan-hewan ini memiliki kemampuan adaptasi luar biasa dan merupakan bagian penting dari jaring makanan laut.',
                    'position'    => [-0.4, 0.1, 0.3],
                    'audio_url'   => '/audio/moluska.mp3',
                ],
                [
                    'identifier'  => 'poi-3',
                    'label'       => 'Invertebrata Laut',
                    'description' => 'Bintang laut, teripang, dan bulu babi adalah invertebrata yang tidak memiliki tulang belakang. Mereka berperan sebagai pembersih alami dasar laut dan menjaga kebersihan ekosistem terumbu karang.',
                    'position'    => [0.1, -0.4, 0.2],
                    'audio_url'   => '/audio/invertebrata.mp3',
                ],
                [
                    'identifier'  => 'poi-4',
                    'label'       => 'Mamalia Laut',
                    'description' => 'Lumba-lumba dan paus yang sesekali muncul di perairan Raja Ampat adalah mamalia berdarah panas. Kehadiran mereka menjadi indikator bahwa ekosistem laut di kawasan ini masih sangat sehat.',
                    'position'    => [0.2, 0.5, -0.1],
                    'audio_url'   => '/audio/mamalia-laut.mp3',
                ],
            ],

            // =============================================
            // MODUL 3: Ancaman Lingkungan Laut
            // =============================================
            'ancaman-lingkungan' => [
                [
                    'identifier'  => 'poi-1',
                    'label'       => 'Pemutihan Karang',
                    'description' => 'Saat suhu air laut naik akibat perubahan iklim, karang mengalami stres dan mengeluarkan zooxanthellae simbiotiknya. Akibatnya karang memutih dan bisa mati jika kondisi tidak membaik dalam waktu singkat.',
                    'position'    => [0.5, 0.1, 0],
                    'audio_url'   => '/audio/pemutihan-karang.mp3',
                ],
                [
                    'identifier'  => 'poi-2',
                    'label'       => 'Polusi Plastik',
                    'description' => 'Jutaan ton sampah plastik berakhir di lautan setiap tahunnya. Plastik terurai menjadi mikroplastik yang tertelan oleh ikan dan invertebrata, masuk ke rantai makanan, dan akhirnya berdampak pada kesehatan manusia.',
                    'position'    => [-0.3, 0.4, 0.1],
                    'audio_url'   => '/audio/polusi-plastik.mp3',
                ],
                [
                    'identifier'  => 'poi-3',
                    'label'       => 'Asidifikasi Laut',
                    'description' => 'Meningkatnya CO₂ di atmosfer diserap oleh laut, menyebabkan air laut menjadi lebih asam. Kondisi ini menghambat pertumbuhan rangka kapur karang dan melemahkan cangkang berbagai organisme laut.',
                    'position'    => [0.1, -0.3, 0.4],
                    'audio_url'   => '/audio/asidifikasi.mp3',
                ],
                [
                    'identifier'  => 'poi-4',
                    'label'       => 'Penangkapan Ikan Destruktif',
                    'description' => 'Penggunaan bom ikan dan sianida menghancurkan struktur terumbu karang secara langsung dan membunuh semua organisme tanpa terkecuali. Metode ilegal ini merusak ekosistem yang membutuhkan ratusan tahun untuk pulih.',
                    'position'    => [-0.2, -0.2, 0.3],
                    'audio_url'   => '/audio/bom-ikan.mp3',
                ],
            ],

            // =============================================
            // MODUL 4: Aksi Konservasi Nyata
            // =============================================
            'konservasi-aksi' => [
                [
                    'identifier'  => 'poi-1',
                    'label'       => 'Penyelaman Ramah Lingkungan',
                    'description' => 'Penyelaman yang bertanggung jawab berarti tidak menyentuh, menginjak, atau mengambil organisme laut. Menjaga jarak dari karang dan mengontrol daya apung adalah kunci untuk tidak merusak ekosistem saat menikmati keindahan bawah laut.',
                    'position'    => [0.4, 0.2, 0],
                    'audio_url'   => '/audio/penyelaman-ramah.mp3',
                ],
                [
                    'identifier'  => 'poi-2',
                    'label'       => 'Transplantasi Karang',
                    'description' => 'Fragmen kecil karang yang sehat ditumbuhkan di nurseri bawah laut, kemudian ditransplantasikan ke area terumbu yang rusak. Teknik ini terbukti efektif membantu pemulihan ekosistem karang yang terdegradasi.',
                    'position'    => [-0.3, 0.4, 0.2],
                    'audio_url'   => '/audio/transplantasi.mp3',
                ],
                [
                    'identifier'  => 'poi-3',
                    'label'       => 'Kawasan Konservasi Laut',
                    'description' => 'Marine Protected Area (MPA) atau Kawasan Konservasi Laut adalah zona yang dilindungi dari eksploitasi berlebihan. Di dalam MPA, populasi ikan dan kesehatan karang pulih secara alami, dan manfaatnya dirasakan hingga ke perairan sekitarnya.',
                    'position'    => [0.1, -0.3, 0.4],
                    'audio_url'   => '/audio/mpa.mp3',
                ],
                [
                    'identifier'  => 'poi-4',
                    'label'       => 'Kurangi Plastik Sekali Pakai',
                    'description' => 'Langkah paling sederhana namun berdampak besar: membawa tas belanja sendiri, menggunakan botol minum isi ulang, dan menolak sedotan plastik. Setiap tindakan kecil ini mengurangi jumlah plastik yang berpotensi mencemari lautan.',
                    'position'    => [-0.1, 0.1, 0.5],
                    'audio_url'   => '/audio/kurangi-plastik.mp3',
                ],
            ],
        ];

        foreach ($modulePois as $slug => $pois) {
            $moduleId = Module::where('slug', $slug)->value('id');
            if (!$moduleId) continue;

            foreach ($pois as $poi) {
                PointOfInterest::firstOrCreate(
                    ['module_id' => $moduleId, 'identifier' => $poi['identifier']],
                    array_merge($poi, ['module_id' => $moduleId])
                );
            }
        }
    }
}
