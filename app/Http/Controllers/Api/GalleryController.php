<?php

namespace App\Http\Controllers\Api;

use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Content;

class GalleryController extends Controller
{
    /**
     * Get data for Gallery.
     * 
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $contents = Content::select('id', 'title', 'category', 'author', 'file_path as image', 'status', 'created_at')
            ->where('status', 'approved')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            "status" => "success",
            "message" => "Data Gallery Berhasil Diambil",
            "data" => $contents
        ]);
    }
        public function paginated(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 12);

        $contents = Content::select('id', 'title', 'file_path', 'status', 'created_at')
            ->where('status', 'approved')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return response()->json([
            "status" => "success",
            "message" => "Data Gallery Berhasil Diambil",
            "data" => $contents->items(),
            "pagination" => [
                "current_page" => $contents->currentPage(),
                "per_page" => $contents->perPage(),
                "total" => $contents->total(),
                "last_page" => $contents->lastPage(),
            ]
        ]);
    }
 }

