<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBankBranchesTable extends Migration
{

    public function up()
    {
        Schema::create('bank_branches', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->tinyInteger('bank_id')->unsigned();
            $table->string('number',5);
            $table->string('name',45);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('bank_id')->references('id')->on('banks')->onDelete('cascade')->onUpdate('cascade');
        });
    }


    public function down()
    {
        Schema::dropIfExists('bank_branches');
    }
}
