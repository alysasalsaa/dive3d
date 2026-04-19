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
        Schema::create('user_progress', function (Blueprint $table) {
            $table->id();
            // Menyambungkan memori ke user yang sedang login (untuk sementara boleh kosong/nullable jika belum ada fitur login)
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');

            // Menyambungkan memori ke modul mana yang sedang dibuka (terumbu-karang, dst)
            $table->foreignId('module_id')->constrained()->onDelete('cascade');

            // Ini jantungnya! Kita pakai tipe data JSON karena visitedPois dari frontend adalah format Array ['poi-1', 'poi-2']
            $table->json('visited_pois')->nullable();

            // Status apakah user sudah tamat memutar 3D nya?
            $table->boolean('completed')->default(false);

            $table->timestamps();
            // Memastikan 1 akun user hanya punya 1 memori progres per 1 modul (tidak boleh data ganda)
            $table->unique(['user_id', 'module_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_progress');
    }
};
