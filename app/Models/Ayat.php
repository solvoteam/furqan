<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ayat extends Model
{
    public $timestamps = false;

    public $appends = ['audio'];

    public function translations()
    {
        return $this->hasMany(AyatTranslation::class);
    }

    public function translation($translation_id = 1)
    {
        return $this->hasOne(AyatTranslation::class)->where('translation_id', $translation_id);
    }

    public function getAudioAttribute()
    {
        $urlBase = config('services.everyayah.url_base');

        if (!$urlBase) {
            return null;
        }

        $suratNumber = sprintf("%03d", $this->surat_number);
        $ayatNumber = sprintf("%03d", $this->number);

        return $urlBase . $suratNumber . $ayatNumber . '.mp3';
    }
}
