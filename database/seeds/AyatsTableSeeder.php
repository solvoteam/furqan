<?php

use App\Models\Ayat;
use Illuminate\Database\Seeder;

class AyatsTableSeeder extends Seeder
{
    use CsvReadable;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('ayats')->truncate();

        $ayats = [];

        $file = $this->openFile('arabic.csv');

        while ($data = $this->readCsvRow($file)) {
            $ayats[] = [
                'number' => (int)$data[1],
                'surat_number' => (int)$data[0],
                'text' => $data[2],
            ];
        }

        Ayat::insert($ayats);
    }
}
