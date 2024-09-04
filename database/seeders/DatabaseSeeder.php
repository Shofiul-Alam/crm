<?php

namespace Database\seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        DB::table('users')->insert([
            'email' => 'shofiul@krost.com.au',
            'password' => Hash::make('password'),
            'admin' => true,
            'is_verified' => true,
            'created_at' => Carbon::now()
        ]);
    }
}
