<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PreferenceController;
use App\Http\Controllers\BookmarkController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/start-endpoint', function() {
    // return response()->json('App is life and running on Laravel = ' .app()->version());
    return env('APP_TIMEZON');
});


Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::patch('/password-manager', [AuthController::class, 'passwordManager']);

    Route::post('/set-preferences', [PreferenceController::class, 'setPreferences']);
    Route::get('/get-preferences', [PreferenceController::class, 'getPreferences']);

    Route::get('/fetch-auth-news', [NewsController::class, 'fetchNews']);


    Route::post('/set-bookmark/{newsId}', [BookmarkController::class, 'setBookmark']);
    Route::get('/get-bookmarks', [BookmarkController::class, 'getBookmarkedNews']);

    
});

// public routes
    Route::get('/fetch-news', [NewsController::class, 'fetchNews']);
Route::get('/get-top-categories', [NewsController::class, 'getTopCategories']);

Route::get('/get-attributes', [PreferenceController::class, 'getAttributes']);

require __DIR__.'/auth.php';