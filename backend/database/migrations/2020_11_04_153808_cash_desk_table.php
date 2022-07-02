<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CashDeskTable extends Migration
{

    public function up()
    {
        Schema::create('cash_desk', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('store_id')->index();
            $table->string('name','150');
            $table->string('email','250')->unique();
            $table->string('phone','15')->nullable();
            $table->integer('number')->nullable()->unsigned();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('store_id')->references('id')->on('stores')->onDelete('restrict')->onUpdate('restrict');

        });
    }


    public function down()
    {
        Schema::dropIfExists('cash_desk');
    }
}
