<?php

namespace App\Http\Controllers\api\Auth;

use App\Services\AuthService;
use App\Helpers\ApiResponse;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

class AuthController extends Controller
{
    public function __construct(protected AuthService $authService) {}

    public function login(LoginRequest $request)
    {
        $result = $this->authService->login($request->validated());
        $result['user'] = new UserResource($result['user']);

        return ApiResponse::success(
            $result,
            'Login successful.',
            200
        );
    }

    public function register(RegisterRequest $request)
    {
        $result = $this->authService->register($request->validated());
        $result['user'] = new UserResource($result['user']);

        return ApiResponse::success(
            $result,
            'Registration successful.',
            201
        );
    }

    public function logout()
    {
        $this->authService->logout();

        return ApiResponse::success(
            null,
            'Logout successful.',
            200
        );
    }

    public function googleRedirect()
    {
        return $this->authService->googleRedirect();
    }

    public function googleCallback()
    {
        return $this->authService->googleCallback();
    }

   public function forgotPassword(ForgotPasswordRequest $request)
        {
            $this->authService->sendResetLink($request->validated()['email']);

            return ApiResponse::success(
                null,
                'If the email exists, a password reset link has been sent.',
                200
            );
        }


    public function resetPassword(ResetPasswordRequest $request)
    {
        $this->authService->resetPassword($request->validated());

        return ApiResponse::success(
            null,
            'Password has been reset successfully.',
            200
        );
    }
}
