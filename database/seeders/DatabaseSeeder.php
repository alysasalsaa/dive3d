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

        User::firstOrCreate(
            ['email' => 'user2@email.com'],
            [
                'name'     => 'User 2',
                'password' => Hash::make('password'),
                'role'     => 'user',
            ]
        );

        User::firstOrCreate(
            ['email' => 'user3@email.com'],
            [
                'name'     => 'User 3',
                'password' => Hash::make('password'),
                'role'     => 'user',
            ]
        );

        // --- Konten pembelajaran ---
        $this->call([
            ModuleSeeder::class,
            PointOfInterestSeeder::class,
            BadgeSeeder::class,
            QuizQuestionSeeder::class,
        ]);
        $this->call(ContentsTableSeeder::class);
        $this->call(UserProgressTableSeeder::class);
        $this->call(QuizResultsTableSeeder::class);
        $this->call(UserBadgesTableSeeder::class);
    }
}
