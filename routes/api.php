<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\UserProgressController;
use App\Http\Controllers\Api\AuthController;

// Endpoint Autentikasi
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Endpoint Agregat untuk Dashboard
// Bisa dites di http://localhost:8000/api/dashboard
Route::get('/dashboard', [DashboardController::class, 'index']);

// Endpoint untuk Gallery
Route::get('/gallery', [GalleryController::class, 'index']);

// Endpoint untuk Upload Karya (bebas CSRF)
Route::post('/upload', [ContentController::class, 'upload']);

// Endpoint untuk Modul Pembelajaran
Route::get('/modules', [ModuleController::class, 'index']);

// Endpoint untuk Menyimpan dan Mengambil Data Progres
Route::middleware('auth:sanctum')->group(function () {

    // Rute Progres (Pindahan dari publik agar punya ID User Asli)
    Route::get('/progress/{slug}', [UserProgressController::class, 'show']);
    Route::post('/progress', [UserProgressController::class, 'update']);

    // Admin review (diproteksi)
    Route::prefix('/admin')->group(function () {
        Route::get('/pending', [ContentController::class, 'pending']);
        Route::post('/approve/{id}', [ContentController::class, 'approve']);
        Route::post('/reject/{id}', [ContentController::class, 'reject']);
    });

    // Rute Logout
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Showcase
Route::get('/showcase', [ContentController::class, 'showcase']);

// Optional limit
Route::get('/showcase/{limit}', [ContentController::class, 'showcaseLimit']);

// Gallery paginated
Route::get('/gallery/paginated', [GalleryController::class, 'paginated']);




