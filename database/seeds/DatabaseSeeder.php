<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();

        $this->call(TranslationsTableSeeder::class);
        $this->call(AyatsTableSeeder::class);
        $this->call(AyatTranslationsTableSeeder::class);

        Schema::enableForeignKeyConstraints();
    }
}
