<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    /**
     * Register a new user.
     *
     * @param array $data
     * @return User
     */
    public function register(array $data)
    {
        // Hash the password before storing
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        return $user;
    }

    /**
     * Login a user and generate a token.
     *
     * @param array $credentials
     * @return array|null
     */
    public function login(array $credentials)
    {
        if (auth()->attempt($credentials)) {
            $user = auth()->user();
            $token = $user->createToken('authToken')->plainTextToken;

            return ['user' => $user, 'token' => $token];
        }

        return null;
    }
    
    /**
     * Change the user's password.
     *
     * @param User $user
     * @param string $currentPassword
     * @param string $newPassword
     * @return bool
     */
    public function changePassword(string $currentPassword, string $newPassword)
    {
        $user = auth()->user();
        
        if (Hash::check($currentPassword, $user->password)) {
            $user->password = Hash::make($newPassword);
            $user->save();

            return true;
        }

        return false;
    }
}
