<?php

use App\Models\Translation;
use Illuminate\Database\Seeder;

class TranslationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('translations')->truncate();

        Translation::create([
            'title' => 'Russian: Кулиев',
        ]);
    }
}
