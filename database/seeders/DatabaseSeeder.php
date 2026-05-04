<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // --- Akun default (firstOrCreate agar tidak duplikat) ---
        User::firstOrCreate(
            ['email' => 'admin@email.com'],
            [
                'name'     => 'Admin',
                'password' => Hash::make('admin123'),
                'role'     => 'admin',
            ]
        );

        // --- Konten pembelajaran ---
        $this->call([
            ModuleSeeder::class,
            PointOfInterestSeeder::class,
            BadgeSeeder::class,
            QuizQuestionSeeder::class,
        ]);
    }
}
