<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

// Di dalam method run():
User::create([
    'name' => 'Admin Utama',
    'email' => 'admin@siapmenang.com',
    'password' => Hash::make('password123'),
    'role' => 'admin',
    'is_active' => 1,
]);
