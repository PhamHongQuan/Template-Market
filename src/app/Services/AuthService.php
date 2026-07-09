<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Validation\ValidationException;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthService
{
    public function __construct(protected UserRepository $userRepository) {}

    public function login(array $data)
    {
        if (! $token = JWTAuth::attempt($data)) {
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

    public function register(array $data)
    {
        $user = $this->userRepository->create($data);

        $token = JWTAuth::fromUser($user);

        return [
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ];
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
    }
}
