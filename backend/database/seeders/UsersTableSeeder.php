<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Ibrahim Yemi',
            'email' => 'ibrahimsharafadeen95@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('sarafa@224'),
        ]);
    }
}
