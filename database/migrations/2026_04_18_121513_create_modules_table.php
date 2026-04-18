<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('modules', function (Blueprint $table) {
            $table->id();                                 // Auto Increment ID bawaan Laravel
            $table->string('slug')->unique();             // Untuk ID referensi seperti 'terumbu-karang'
            $table->string('title');                      // Judul utama modul
            $table->text('long_description');             // Deskripsi teks panjang
            $table->string('icon');                       // Emoji ikon (contoh: '🪸')
            $table->string('difficulty');                 // Tingkat kesulitan ('Pemula', dsb)
            $table->string('estimated_time');             // Estimasi (contoh: '15 menit')
            $table->string('gradient_from');              // Warna awal background/kartu
            $table->string('gradient_to');                // Warna akhir background/kartu
            $table->string('model_url');                  // Link menuju file aset 3D (gltf)
            $table->timestamps();                         // Kolom otomatis created_at & updated_at
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modules');
    }
};
