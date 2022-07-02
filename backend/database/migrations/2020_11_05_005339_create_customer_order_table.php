<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomerOrderTable extends Migration
{

    public function up()
    {
        Schema::create('customer_order', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('cash_desk_id')->index();
            $table->unsignedInteger('customer_id')->index()->nullable();
            $table->string('description','200');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('cash_desk_id')->references('id')->on('cash_desk')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('customer_order');
    }
}
