<?php

namespace App\Repositories;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    // Find a user by email
    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }

    // Create a new user
    public function create(array $data): User
    {
        return User::create($data);
    }

    // Update an existing user
    public function update(User $user, array $data): User
        {
            $user->update($data);
            return $user->refresh();
        }


    // Change the password of a user
    public function changePassword(User $user, string $password): User
    {
        $user->update([
            'password' => $password,
        ]);

        return $user;
    }

    // Save the user instance
    public function save(User $user): User
    {
        $user->save();

        return $user->refresh();
    }
}
