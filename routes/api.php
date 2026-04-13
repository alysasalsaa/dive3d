<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\GalleryController;

// Endpoint Agregat untuk Dashboard
// Bisa dites di http://localhost:8000/api/dashboard
Route::get('/dashboard', [DashboardController::class, 'index']);

// Endpoint untuk Gallery
Route::get('/gallery', [GalleryController::class, 'index']);
