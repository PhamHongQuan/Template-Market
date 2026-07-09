<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\Auth\AuthController;
use App\Http\Controllers\api\Account\AccountController;


// Authentication Routes
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);

    Route::middleware('jwt')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});


// Account Routes
Route::middleware('jwt')->prefix('account')->controller(AccountController::class)->group(function () {
    Route::get('/', 'me');
    Route::put('/', 'update');
    Route::put('/password', 'changePassword');
});
