<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenusTable extends Migration
{

    public function up()
    {
        Schema::create('menus', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', '90');
            $table->integer('serial_number')->nullable();
            $table->string('color', '90')->nullable();
            $table->unsignedInteger('parent_id')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('parent_id')->references('id')->on('menus')->cascadeOnDelete()->cascadeOnUpdate();

        });
    }

    public function down()
    {
        Schema::dropIfExists('menus');
    }
}
