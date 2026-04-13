<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContentController;

Route::get('/', function () {
    return view('welcome');
});

Route:: post('/upload',[ContentController::class,'upload']);

