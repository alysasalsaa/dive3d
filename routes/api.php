<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\UserProgressController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\BadgeController;
use App\Http\Controllers\QuizController;

// Endpoint Autentikasi
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


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

    // Dashboard (butuh auth agar dapat nama user asli)
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Rute Badge
    Route::get('/badges', [BadgeController::class, 'index']);
    Route::get('/badges/my', [BadgeController::class, 'my']);

    // Rute Quiz
    Route::post('/quiz/submit', [QuizController::class, 'submit']);

    // Rute Logout
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Showcase
Route::get('/showcase', [ContentController::class, 'showcase']);

// Optional limit
Route::get('/showcase/{limit}', [ContentController::class, 'showcaseLimit']);

// Gallery paginated
Route::get('/gallery/paginated', [GalleryController::class, 'paginated']);




