<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomerOrderPaymentTable extends Migration
{
    public function up()
    {
        Schema::create('customer_order_payment', function (Blueprint $table) {
            //todo
            $table->increments('id');
            $table->unsignedInteger('customer_order_id')->index();
            $table->float('price',8,2);
            $table->string('description','200');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('customer_order_id')->references('id')->on('customers')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('customer_order_payment');
    }
}
