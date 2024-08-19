<?php

namespace Database\Seeders;

use App\Models\Home;
use App\Models\Resident;
use App\Models\Room;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::truncate();

        User::factory(2)->create();

        Home::factory(3)
            ->has(Room::factory(5)
                ->has(Setting::factory(3)))
            ->create();

        Resident::factory(3)->create([
            'home_id' => 1
        ]);
        Resident::factory(2)->create([
            'home_id' => 2
        ]);
        Resident::factory(5)->create([
            'home_id' => 3
        ]);
    }
}
