<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Content;
use Illuminate\Support\Facades\DB;




class ContentController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            "file" => "required|file",
            'title' => 'required|string',
            'category' => 'required|string',
            'author' => 'required|string'
        ]);

        $path = $request->file('file')->store('uploads', 'public');
        $url = asset('storage/' . $path);
        Content::create([
            'title' => $request->title,
            'category' => $request->category,
            'author' => $request->author,
            'file_path' => $url,
            'status' => 'pending'
        ]);
        return response()->json([
            'message' => 'File uploaded successfully',
            'file' => $url,
        ]);
    }
    public function showcase()
    {
        $data = DB::table('contents')
            ->select('id', 'title', 'created_at', 'file_path')
            ->where('status', 'approved')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return response()->json([
            'status' => 'success',
            'total' => count($data),
            'data' => $data
        ]);
    }
    public function showcaseLimit($limit)
    {
        $data = DB::table('contents')
            ->select('id', 'title', 'created_at', 'file_path')
            ->where('status', 'approved')
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();

        return response()->json([
            'status' => 'success',
            'total' => count($data),
            'data' => $data
        ]);
    }

    public function pending()
    {
        return response()->json(
            Content::where('status', 'pending')->get()
        );
    }
    public function approve($id)
    {
        $content = Content::findOrFail($id);
        $content->status = 'approved';
        $content->save();

        return response()->json(
            ['message' => 'Content approved']
        );
    }

    public function reject($id)
    {
        $content = Content::findOrFail($id);
        $content->status = 'rejected';
        $content->save();

        return response()->json(
            ['message' => 'Content rejected']
        );
    }

    public function destroy($id)
    {
        $content = Content::findOrFail($id);
        $content->delete();

        return response()->json(
            ['message' => 'Content deleted permanently']
        );
    }
}

