<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePreparationInstructionTable extends Migration
{

    public function up()
    {
        Schema::create('preparation_instructions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', '120');
            $table->string('type', '90');
            $table->tinyInteger('is_default')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });
    }

    public function down()
    {
        Schema::dropIfExists('preparation_instruction');
    }
}
