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
        Schema::create('point_of_interests', function (Blueprint $table) {
            $table->id();
            // Sambungan ke ID Modul (Misal: Milik Modul Terumbu Karang)
            $table->foreignId('module_id')->constrained()->cascadeOnDelete();

            // Kolom Data Titik (POI)
            $table->string('identifier'); // Misal: 'poi-1'
            $table->string('label'); // Judul, misal: 'Polip Karang'
            $table->text('description'); // Teks Narasi yang lumayan panjang
            $table->json('position'); // Koordinat X, Y, Z tersimpan sebagai Array JSON

            // Kolom Khusus WBS 2.3.3: Narasi Audio! (Boleh kosong di awal)
            $table->string('audio_url')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('point_of_interests');
    }
};
