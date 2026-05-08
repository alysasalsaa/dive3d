<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil semua data pada tabel modules, BESERTA data pois-nya!
        $modules = Module::with('pois')->get();

        return response()->json($modules);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'slug' => 'required|string|unique:modules,slug',
            'title' => 'required|string',
            'desc' => 'nullable|string',
        ]);

        $module = Module::create([
            'slug' => $request->slug,
            'title' => $request->title,
            'long_description' => $request->desc,
            'icon' => '📦',
            'difficulty' => 'Mudah',
            'estimated_time' => '15 Menit',
            'gradient_from' => 'from-indigo-500',
            'gradient_to' => 'to-blue-500',
            'model_url' => '',
        ]);

        return response()->json(['message' => 'Modul berhasil ditambahkan', 'data' => $module], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $module = Module::where('slug', $slug)->firstOrFail();
        return response()->json($module);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $slug)
    {
        $module = Module::where('slug', $slug)->firstOrFail();

        $request->validate([
            'title' => 'required|string',
            'desc' => 'nullable|string',
        ]);

        $module->update([
            'title' => $request->title,
            'long_description' => $request->desc,
        ]);

        return response()->json(['message' => 'Modul berhasil diperbarui', 'data' => $module]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($slug)
    {
        $module = Module::where('slug', $slug)->firstOrFail();
        // Hapus modul
        $module->delete();
        return response()->json(['message' => 'Modul berhasil dihapus']);
    }
}
