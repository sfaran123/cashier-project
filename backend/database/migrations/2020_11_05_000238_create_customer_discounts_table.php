<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomerDiscountsTable extends Migration
{

    public function up()
    {
        Schema::create('customer_discounts', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('customer_id')->index();
            $table->unsignedInteger('discount_id')->index();
            $table->string('code');
            $table->date('first_date')->nullable();
            $table->date('last_date')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('restrict')->onUpdate('restrict'); //todo check "restrict"
            $table->foreign('discount_id')->references('id')->on('discounts')->onDelete('restrict')->onUpdate('restrict'); //todo check "restrict"
        });
    }

    public function down()
    {
        Schema::dropIfExists('customer_discounts');
    }
}
