<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAyatTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ayat_translations', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('ayat_id');
            $table->unsignedInteger('translation_id');
            $table->text('text');

            $table->foreign('ayat_id')->references('id')->on('ayats');
            $table->foreign('translation_id')->references('id')->on('translations');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ayat_translations');
    }
}
