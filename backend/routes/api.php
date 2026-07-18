<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\Auth\AuthController;
use App\Http\Controllers\api\Account\AccountController;
use App\Http\Controllers\api\Category\CategoryController;
use App\Http\Controllers\api\Template\TemplateController;

// Authentication Routes
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);

    Route::get('/google/redirect', [AuthController::class, 'googleRedirect']);
    Route::get('/google/callback', [AuthController::class, 'googleCallback']);

    Route::middleware('jwt')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

// Account Routes
Route::middleware('jwt')
    ->prefix('account')
    ->controller(AccountController::class)
    ->group(function () {
        Route::get('/', 'me');
        Route::put('/', 'update');
        Route::put('/password', 'changePassword');
        Route::put('/avatar', 'updateAvatar');
    });

// Public Category Routes
Route::prefix('categories')
    ->controller(CategoryController::class)
    ->group(function () {
        Route::get('/', 'index');
        Route::get('/{id}', 'show');
        Route::post('/', 'store')->middleware('jwt');
    });



// Public Template Routes
Route::prefix('templates')->group(function () {

    // CRUD Template
    Route::get('/', [TemplateController::class, 'index']);
    Route::post('/', [TemplateController::class, 'store']);
    Route::get('/{id}', [TemplateController::class, 'show']);
    Route::put('/{id}', [TemplateController::class, 'update']);
    Route::delete('/{id}', [TemplateController::class, 'destroy']);

    // Upload thumbnail
    Route::post(
        '/{id}/thumbnail',
        [TemplateController::class, 'uploadThumbnail']
    );

    // Upload preview images
    Route::post(
        '/{id}/preview',
        [TemplateController::class, 'uploadPreview']
    );

    // Upload source file
    Route::post(
        '/{id}/source',
        [TemplateController::class, 'uploadSource']
    );
});
