<?php

namespace App\Http\Controllers\api\Auth;

use App\Services\AuthService;
use App\Helpers\ApiResponse;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Controllers\Controller;

class LoginController extends Controller
{
    public function __construct(protected AuthService $authService) {}

    public function login(LoginRequest $request)
    {
        $result = $this->authService->login($request->validated());

        return ApiResponse::success(
            $result,
            'Login successful.',
            200
        );
    }
}
