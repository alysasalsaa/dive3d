<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class QuizQuestionsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('quiz_questions')->delete();
        
        \DB::table('quiz_questions')->insert(array (
            0 => 
            array (
                'id' => 1,
                'module_slug' => 'terumbu-karang',
                'question' => 'Ekosistem laut adalah...',
                'option_a' => 'Kumpulan ikan di laut',
                'option_b' => 'Interaksi makhluk hidup dengan lingkungan laut',
                'option_c' => 'Laut yang luas dan dalam',
                'option_d' => 'Tempat hidup manusia di laut',
                'correct_answer' => 'B',
                'created_at' => '2026-05-04 02:33:52',
                'updated_at' => '2026-05-04 02:33:52',
            ),
            1 => 
            array (
                'id' => 2,
                'module_slug' => 'terumbu-karang',
                'question' => 'Contoh interaksi dalam ekosistem laut adalah...',
                'option_a' => 'Air laut menguap',
                'option_b' => 'Ikan memakan plankton',
                'option_c' => 'Pasir di dasar laut',
                'option_d' => 'Ombak laut',
                'correct_answer' => 'B',
                'created_at' => '2026-05-04 02:33:53',
                'updated_at' => '2026-05-04 02:33:53',
            ),
            2 => 
            array (
                'id' => 3,
                'module_slug' => 'terumbu-karang',
                'question' => 'Yang termasuk komponen biotik dalam ekosistem laut adalah...',
                'option_a' => 'Air laut',
                'option_b' => 'Cahaya matahari',
                'option_c' => 'Ikan',
                'option_d' => 'Suhu',
                'correct_answer' => 'C',
                'created_at' => '2026-05-04 02:33:53',
                'updated_at' => '2026-05-04 02:33:53',
            ),
            3 => 
            array (
                'id' => 4,
                'module_slug' => 'terumbu-karang',
                'question' => 'Komponen abiotik yang memengaruhi kehidupan biota laut adalah...',
                'option_a' => 'Karang',
                'option_b' => 'Ikan',
                'option_c' => 'Salinitas',
                'option_d' => 'Plankton',
                'correct_answer' => 'C',
                'created_at' => '2026-05-04 02:33:53',
                'updated_at' => '2026-05-04 02:33:53',
            ),
            4 => 
            array (
                'id' => 5,
                'module_slug' => 'terumbu-karang',
                'question' => 'Urutan rantai makanan di laut yang benar adalah...',
                'option_a' => 'Ikan besar → plankton → ikan kecil',
                'option_b' => 'Fitoplankton → zooplankton → ikan kecil',
                'option_c' => 'Ikan kecil → plankton → paus',
                'option_d' => 'Hiu → plankton → ikan kecil',
                'correct_answer' => 'B',
                'created_at' => '2026-05-04 02:33:53',
                'updated_at' => '2026-05-04 02:33:53',
            ),
            5 => 
            array (
                'id' => 6,
                'module_slug' => 'terumbu-karang',
                'question' => 'Dampak overfishing terhadap rantai makanan laut adalah...',
                'option_a' => 'Menambah jumlah ikan',
                'option_b' => 'Tidak berpengaruh sama sekali',
                'option_c' => 'Mengganggu keseimbangan ekosistem',
                'option_d' => 'Menambah jumlah plankton',
                'correct_answer' => 'C',
                'created_at' => '2026-05-04 02:33:54',
                'updated_at' => '2026-05-04 02:33:54',
            ),
            6 => 
            array (
                'id' => 7,
                'module_slug' => 'keanekaragaman-laut',
                'question' => 'Contoh biota laut adalah...',
                'option_a' => 'Ayam',
                'option_b' => 'Kucing',
                'option_c' => 'Clownfish',
                'option_d' => 'Sapi',
                'correct_answer' => 'C',
                'created_at' => '2026-05-04 02:33:54',
                'updated_at' => '2026-05-04 02:33:54',
            ),
            7 => 
            array (
                'id' => 8,
                'module_slug' => 'keanekaragaman-laut',
                'question' => 'Hewan laut yang termasuk mamalia adalah...',
                'option_a' => 'Ikan pari',
                'option_b' => 'Paus',
                'option_c' => 'Udang',
                'option_d' => 'Karang',
                'correct_answer' => 'B',
                'created_at' => '2026-05-04 02:33:54',
                'updated_at' => '2026-05-04 02:33:54',
            ),
            8 => 
            array (
                'id' => 9,
                'module_slug' => 'keanekaragaman-laut',
            'question' => 'Kima raksasa (Tridacna gigas) termasuk kelompok...',
                'option_a' => 'Ikan',
                'option_b' => 'Mamalia',
                'option_c' => 'Moluska',
                'option_d' => 'Reptil',
                'correct_answer' => 'C',
                'created_at' => '2026-05-04 02:33:55',
                'updated_at' => '2026-05-04 02:33:55',
            ),
            9 => 
            array (
                'id' => 10,
                'module_slug' => 'keanekaragaman-laut',
                'question' => 'Pengelompokan biota laut berdasarkan karakteristiknya bertujuan untuk...',
                'option_a' => 'Memperindah tampilan laut',
                'option_b' => 'Memudahkan memahami ekosistem',
                'option_c' => 'Mengurangi jumlah biota',
                'option_d' => 'Mengubah habitat laut',
                'correct_answer' => 'B',
                'created_at' => '2026-05-04 02:33:55',
                'updated_at' => '2026-05-04 02:33:55',
            ),
            10 => 
            array (
                'id' => 11,
                'module_slug' => 'keanekaragaman-laut',
                'question' => 'Peran ikan dalam ekosistem laut adalah...',
                'option_a' => 'Mengotori laut',
                'option_b' => 'Menjaga keseimbangan ekosistem',
                'option_c' => 'Menghancurkan karang',
                'option_d' => 'Mengurangi volume air laut',
                'correct_answer' => 'B',
                'created_at' => '2026-05-04 02:33:55',
                'updated_at' => '2026-05-04 02:33:55',
            ),
            11 => 
            array (
                'id' => 12,
                'module_slug' => 'keanekaragaman-laut',
                'question' => 'Jika salah satu biota laut punah, maka yang terjadi adalah...',
                'option_a' => 'Ekosistem tetap stabil',
                'option_b' => 'Tidak ada perubahan apapun',
                'option_c' => 'Keseimbangan ekosistem terganggu',
                'option_d' => 'Laut menjadi lebih jernih',
                'correct_answer' => 'C',
                'created_at' => '2026-05-04 02:33:55',
                'updated_at' => '2026-05-04 02:33:55',
            ),
            12 => 
            array (
                'id' => 13,
                'module_slug' => 'ancaman-lingkungan',
                'question' => 'Terumbu karang adalah...',
                'option_a' => 'Batu biasa yang ada di dasar laut',
                'option_b' => 'Struktur laut yang terbentuk dari organisme karang',
                'option_c' => 'Pasir laut yang mengeras',
                'option_d' => 'Endapan lumpur laut',
                'correct_answer' => 'B',
                'created_at' => '2026-05-04 02:33:56',
                'updated_at' => '2026-05-04 02:33:56',
            ),
            13 => 
            array (
                'id' => 14,
                'module_slug' => 'ancaman-lingkungan',
                'question' => 'Terumbu karang terbentuk dari...',
                'option_a' => 'Pasir laut yang terpadatkan',
                'option_b' => 'Kalsium karbonat yang dihasilkan organisme karang',
                'option_c' => 'Penguapan air laut',
                'option_d' => 'Endapan lumpur sungai',
                'correct_answer' => 'B',
                'created_at' => '2026-05-04 02:33:56',
                'updated_at' => '2026-05-04 02:33:56',
            ),
            14 => 
            array (
                'id' => 15,
                'module_slug' => 'ancaman-lingkungan',
                'question' => 'Fungsi utama terumbu karang bagi ekosistem laut adalah...',
                'option_a' => 'Mengotori perairan laut',
                'option_b' => 'Menjadi tempat hidup berbagai biota laut',
                'option_c' => 'Mengurangi volume air laut',
                'option_d' => 'Menambah jumlah sampah di laut',
                'correct_answer' => 'B',
                'created_at' => '2026-05-04 02:33:56',
                'updated_at' => '2026-05-04 02:33:56',
            ),
            15 => 
            array (
                'id' => 16,
                'module_slug' => 'ancaman-lingkungan',
                'question' => 'Terumbu karang membantu melindungi pantai dengan cara...',
                'option_a' => 'Menambah kekuatan ombak',
                'option_b' => 'Menahan dan meredam gelombang laut',
                'option_c' => 'Mengurangi populasi ikan',
                'option_d' => 'Menambah endapan pasir pantai',
                'correct_answer' => 'B',
                'created_at' => '2026-05-04 02:33:56',
                'updated_at' => '2026-05-04 02:33:56',
            ),
            16 => 
            array (
                'id' => 17,
                'module_slug' => 'ancaman-lingkungan',
                'question' => 'Salah satu penyebab kerusakan terumbu karang adalah...',
                'option_a' => 'Menanam mangrove di sekitar pantai',
                'option_b' => 'Overfishing atau penangkapan ikan berlebihan',
                'option_c' => 'Membersihkan sampah di laut',
                'option_d' => 'Program konservasi laut',
                'correct_answer' => 'B',
                'created_at' => '2026-05-04 02:33:57',
                'updated_at' => '2026-05-04 02:33:57',
            ),
            17 => 
            array (
                'id' => 18,
                'module_slug' => 'ancaman-lingkungan',
            'question' => 'Coral bleaching (pemutihan karang) disebabkan oleh...',
                'option_a' => 'Curah hujan yang tinggi',
                'option_b' => 'Perubahan iklim yang menyebabkan kenaikan suhu laut',
                'option_c' => 'Tiupan angin kencang',
                'option_d' => 'Endapan pasir di atas karang',
                'correct_answer' => 'B',
                'created_at' => '2026-05-04 02:33:57',
                'updated_at' => '2026-05-04 02:33:57',
            ),
            18 => 
            array (
                'id' => 19,
                'module_slug' => 'konservasi-aksi',
                'question' => 'Contoh sampah laut yang paling banyak ditemukan adalah...',
                'option_a' => 'Plastik',
                'option_b' => 'Air tawar',
                'option_c' => 'Ikan mati',
                'option_d' => 'Garam laut',
                'correct_answer' => 'A',
                'created_at' => '2026-05-04 02:33:57',
                'updated_at' => '2026-05-04 02:33:57',
            ),
            19 => 
            array (
                'id' => 20,
                'module_slug' => 'konservasi-aksi',
                'question' => 'Sampah yang paling sulit terurai di laut adalah...',
                'option_a' => 'Daun kering',
                'option_b' => 'Plastik',
                'option_c' => 'Ranting kayu',
                'option_d' => 'Kertas basah',
                'correct_answer' => 'B',
                'created_at' => '2026-05-04 02:33:58',
                'updated_at' => '2026-05-04 02:33:58',
            ),
            20 => 
            array (
                'id' => 21,
                'module_slug' => 'konservasi-aksi',
                'question' => 'Dampak utama sampah laut terhadap biota adalah...',
                'option_a' => 'Membuat laut lebih bersih',
                'option_b' => 'Menyebabkan kematian hewan laut',
                'option_c' => 'Menambah volume air laut',
                'option_d' => 'Meningkatkan jumlah ikan',
                'correct_answer' => 'B',
                'created_at' => '2026-05-04 02:33:58',
                'updated_at' => '2026-05-04 02:33:58',
            ),
            21 => 
            array (
                'id' => 22,
                'module_slug' => 'konservasi-aksi',
                'question' => 'Mikroplastik berbahaya bagi ekosistem laut karena...',
                'option_a' => 'Mudah terlihat oleh hewan laut',
                'option_b' => 'Masuk ke rantai makanan dan mengancam kesehatan',
                'option_c' => 'Cepat hilang terurai di air laut',
                'option_d' => 'Tidak memiliki dampak apapun',
                'correct_answer' => 'B',
                'created_at' => '2026-05-04 02:33:58',
                'updated_at' => '2026-05-04 02:33:58',
            ),
            22 => 
            array (
                'id' => 23,
                'module_slug' => 'konservasi-aksi',
                'question' => 'Cara nyata mengurangi sampah laut yang bisa dilakukan sehari-hari adalah...',
                'option_a' => 'Membuang sampah langsung ke laut',
                'option_b' => 'Terus menggunakan plastik sekali pakai',
                'option_c' => 'Daur ulang dan mengurangi plastik sekali pakai',
                'option_d' => 'Membakar sampah di tepi pantai',
                'correct_answer' => 'C',
                'created_at' => '2026-05-04 02:33:58',
                'updated_at' => '2026-05-04 02:33:58',
            ),
            23 => 
            array (
                'id' => 24,
                'module_slug' => 'konservasi-aksi',
                'question' => 'Upaya paling efektif untuk mengurangi sampah laut secara berkelanjutan adalah...',
                'option_a' => 'Menambah produksi plastik',
                'option_b' => 'Edukasi masyarakat dan pengelolaan sampah yang baik',
                'option_c' => 'Membuang sampah ke sungai agar terbawa arus',
                'option_d' => 'Membiarkan sampah terurai sendiri',
                'correct_answer' => 'B',
                'created_at' => '2026-05-04 02:33:59',
                'updated_at' => '2026-05-04 02:33:59',
            ),
        ));
        
        
    }
}