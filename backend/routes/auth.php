<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register'])
    ->middleware('guest');

Route::post('/login', [AuthController::class, 'login'])
    ->middleware('guest');
