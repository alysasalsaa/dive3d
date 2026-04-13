<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Content;



class ContentController extends Controller
{
    public function upload(Request $request){
        $request->validate([
            "file"=> "required|file|mimes:glb,gltf,obj|max:102400",
            'title'=> 'required|string']);   

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
