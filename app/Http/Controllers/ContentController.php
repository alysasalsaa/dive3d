<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Content;



class ContentController extends Controller
{
    public function upload(Request $request){
        $request->validate([
            "file"=> "required|file|max:102400",
            'title'=> 'required|string']);   

        $extension = $request->file('file')->getClientOriginalExtension();
        if (!in_array(strtolower($extension), ['glb', 'gltf', 'obj'])) {
            return response()->json([
                'message' => 'The file field must be a file of type: glb, gltf, obj.',
                'errors' => ['file' => ['The file extension must be .glb, .gltf, or .obj.']]
            ], 422);
        }

    $path = $request->file('file')->store('uploads','public');
    $url = asset('storage/'.$path);
    Content::create([
            'title' => $request->title,
            'file_path' => $url,
            'status' => 'pending'
        ]);
    return response()->json([
        'message' => 'File uploaded successfully',
        'file' => $url,
    ]);
    }
}
