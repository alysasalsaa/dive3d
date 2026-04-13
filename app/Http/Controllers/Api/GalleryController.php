<?php

namespace App\Http\Controllers\Api;

use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;

class GalleryController extends Controller
{
    /**
     * Get data for Gallery.
     * 
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        // -------------------------------------------------------------
        // Ini adalah DUMMY DATA.
        // Nanti bisa Anda ganti dengan query dari database menggunakan Model
        // Contoh: $gallery = Gallery::all();
        // -------------------------------------------------------------
        
        $data = [
            [
                "id" => 1,
                "title" => "Penyu Hijau di Raja Ampat",
                "category" => "Ikan & Biota Laut",
                "image" => "https://images.unsplash.com/photo-1544719543-5ea19c80f4f9?q=80&w=1080&auto=format&fit=crop",
                "likes" => 342,
                "author" => "Bima",
                "description" => "Model 3D penyu hijau berenang melintasi hamparan terumbu karang yang sehat."
            ],
            [
                "id" => 2,
                "title" => "Terumbu Karang Acropora",
                "category" => "Terumbu Karang",
                "image" => "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=1080&auto=format&fit=crop",
                "likes" => 215,
                "author" => "Siska",
                "description" => "Detail pembentukan terumbu karang bercabang jenis Acropora di perairan dangkal."
            ],
            [
                "id" => 3,
                "title" => "Lingkungan Laut Dalam",
                "category" => "Lingkungan",
                "image" => "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1080&auto=format&fit=crop",
                "likes" => 189,
                "author" => "Arya",
                "description" => "Eksplorasi ekosistem laut dalam dengan pencahayaan minim dari kapal selam."
            ],
            [
                "id" => 4,
                "title" => "Ikan Pari Manta",
                "category" => "Ikan & Biota Laut",
                "image" => "https://images.unsplash.com/photo-1544527961-c81bc632a613?q=80&w=1080&auto=format&fit=crop",
                "likes" => 410,
                "author" => "Diana",
                "description" => "Animasi pergerakan elegan Ikan Pari Manta yang sedang mencari makan plankton."
            ],
            [
                "id" => 5,
                "title" => "Restorasi Terumbu Karang",
                "category" => "Lingkungan",
                "image" => "https://images.unsplash.com/photo-1516570183182-14022c4d9eed?q=80&w=1080&auto=format&fit=crop",
                "likes" => 275,
                "author" => "Komunitas Divexplore",
                "description" => "Area restorasi laut dengan rak buatan yang telah memicu tumbuhnya karang baru."
            ],
            [
                "id" => 6,
                "title" => "Kuda Laut Kerdil (Pygmy Seahorse)",
                "category" => "Ikan & Biota Laut",
                "image" => "https://images.unsplash.com/photo-1594958178129-9e8c37255953?q=80&w=1080&auto=format&fit=crop",
                "likes" => 502,
                "author" => "Fahmi",
                "description" => "Kamuflase sempurna Kuda Laut Kerdil di antara karang Gorgonian yang kemerahan."
            ]
        ];

        return response()->json([
            "status" => "success",
            "message" => "Data Gallery Berhasil Diambil",
            "data" => $data
        ]);
    }
}
