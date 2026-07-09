<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Validation\ValidationException;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthService
{
    public function __construct(protected UserRepository $userRepository) {}

    public function login(array $credentials)
    {
        if (! $token = JWTAuth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['Email or password is incorrect.'],
            ]);
        }

        return [
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => JWTAuth::user(),
        ];
    }
}
