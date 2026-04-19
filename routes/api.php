<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\UserProgressController;


// Endpoint Agregat untuk Dashboard
// Bisa dites di http://localhost:8000/api/dashboard
Route::get('/dashboard', [DashboardController::class, 'index']);

// Endpoint untuk Gallery
Route::get('/gallery', [GalleryController::class, 'index']);

// Endpoint untuk Upload Karya (bebas CSRF)
Route::post('/upload', [ContentController::class, 'upload']);

// Endpoint untuk Modul Pembelajaran
Route::get('/modules', [ModuleController::class, 'index']);

Route::get('/progress/{slug}', [UserProgressController::class, 'show']);
Route::post('/progress', [UserProgressController::class, 'update']);
