<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class AccountService
{
    public function __construct(
        protected UserRepository $userRepository
    ) {}

    // Get the authenticated user's profile
    public function me(User $user): User
    {
        return $user;
    }


    // Update the authenticated user's profile
    public function update(User $user, array $data): User
    {
        return $this->userRepository->update($user, $data);
    }


    // Change the authenticated user's password
    public function changePassword(User $user, array $data): void
    {
        if (! Hash::check($data['current_password'], $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => [
                    'Current password is incorrect.',
                ],
            ]);
        }

        $this->userRepository->changePassword(
            $user,
            $data['password']
        );
    }

    // Update the authenticated user's avatar
    public function updateAvatar(
        User $user,
        UploadedFile $avatar
    ): User {

        if ($user->avatar) {
            Storage::disk('s3')->delete($user->avatar);
        }

        $path = $avatar->store(
            "avatars/users/{$user->id}",
            "s3"
        );

        return $this->userRepository->update($user, [
            "avatar" => $path,
        ]);
    }
}
