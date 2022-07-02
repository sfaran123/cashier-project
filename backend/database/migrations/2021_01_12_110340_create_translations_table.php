<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTranslationsTable extends Migration
{

    public function up()
    {
        Schema::create('translations', function (Blueprint $table) {
            $table->increments('id');
            $table->enum('lang', ['ar', 'he', 'en', 'ru']);
            $table->string('name');
            $table->string('value');
        });
    }

    public function down()
    {
        Schema::dropIfExists('translations');
    }
}
