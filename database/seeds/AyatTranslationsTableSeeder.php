<?php

use App\Models\AyatTranslation;
use Illuminate\Database\Seeder;

class AyatTranslationsTableSeeder extends Seeder
{
    use CsvReadable;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('ayat_translations')->truncate();

        $ayatTexts = [];
        $rowNumber = 1;

        $file = $this->openFile('russian-kuliev.csv');

        while ($data = $this->readCsvRow($file)) {
            $ayatTexts[] = [
                'text' => $data[2],
                'translation_id' => 1,
                'ayat_id' => $rowNumber++,
            ];
        }

        AyatTranslation::insert($ayatTexts);
    }
}
