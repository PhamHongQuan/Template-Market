<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
class AuthService
{
    public function __construct(protected UserRepository $userRepository) {}


    /**
     * Login
     */
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

    /**
     * Register
     */
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


    /**
     * Logout
     */
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
    }


    /**
     * Redirect login google
     */
    public function googleRedirect()
    {
        /** @var \Laravel\Socialite\Two\GoogleProvider $provider */
        $provider = Socialite::driver('google');

        return $provider
            ->stateless()
            ->redirect();
    }


    /**
     * Callback login google
     */
    public function googleCallback()
    {
        /** @var \Laravel\Socialite\Two\GoogleProvider $provider */
        $provider = Socialite::driver('google');

        $googleUser = $provider
            ->stateless()
            ->user();

        $user = $this->userRepository
            ->findByEmail($googleUser->getEmail());

        if (!$user) {
            $user = $this->userRepository->createGoogleUser($googleUser);
        }

        $token = JWTAuth::fromUser($user);

        return redirect()->away(
            env("FRONTEND_URL")
            ."/oauth/success?token=".$token
        );
    }


    /**
     * Send link forgot pwd
     */
     public function sendResetLink(string $email): void
    {
        $status = Password::sendResetLink([
            'email' => $email,
        ]);
    }


    /**
     * Reset pwd
     */
    public function resetPassword(array $data): void
    {
        $status = Password::reset(
            [
                'email' => $data['email'],
                'password' => $data['password'],
                'password_confirmation' => $data['password_confirmation'],
                'token' => $data['token'],
            ],
            function ($user, $password) {

                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        if ($status !== Password::PASSWORD_RESET) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        }
    }
}

