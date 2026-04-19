<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserProgress;
use App\Models\Module;

class UserProgressController extends Controller
{
    // TUGAS 1: Mengambil Data (Dipanggil Frontend saat User baru Buka Halaman)
    public function show($slug)
    {
        // 1. Lacak modul apa yang sedang dimainkan
        $module = Module::where('slug', $slug)->firstOrFail();

        // 2. Ambil progres si user. (Karena sistem "Login" belum diajarkan, kita pakai user sakti 'user_id' = 1)
        // firstOrCreate artinya: Kalau buka web perdana, otomatis buat progres 0%. Kalau buka kedua kali, load progres lama!
        $progress = UserProgress::firstOrCreate(
            ['user_id' => null, 'module_id' => $module->id],
            ['visited_pois' => [], 'completed' => false] // Titik 0% mula-mula
        );

        // 3. Kembalikan bentuk datanya persis menggunakan gaya camelCase yang diwajibkan Frontend
        return response()->json([
            'moduleId' => $module->slug,
            'visitedPois' => $progress->visited_pois ?? [],
            'completed' => $progress->completed
        ]);
    }

    // TUGAS 2: Menyimpan Data (Dipanggil Otomatis saat Frontend melapor user habis nge-Klik bagian terumbu)
    public function update(Request $request)
    {
        // 1. Penjaga gerbang pengeklik (Harus ada data bentuk Array)
        $request->validate([
            'moduleId' => 'required|string',
            'visitedPois' => 'required|array',
            'completed' => 'required|boolean'
        ]);

        $module = Module::where('slug', $request->moduleId)->firstOrFail();

        // 2. Tancapkan ingatan si user ke Tabel Database kita di Supabase
        $progress = UserProgress::updateOrCreate(
            ['user_id' => null, 'module_id' => $module->id],
            [
                'visited_pois' => $request->visitedPois,
                'completed' => $request->completed
            ]
        );

        return response()->json([
            'message' => 'Progres navigasi berhasil disimpan permanently ke Supabase!',
            'data' => $progress
        ]);
    }
}

