<?php

trait CsvReadable {

    public function openFile($filename)
    {
        $filePath = __DIR__ . "/../csv/$filename";
        $file = fopen($filePath, "r");

        if ($file === false) {
            throw new \Exception("Cannot read the file: $filename");
        } else {
            return $file;
        }
    }

    public function readCsvRow($file)
    {
        return fgetcsv($file, 0, '|', ' ');
    }

}