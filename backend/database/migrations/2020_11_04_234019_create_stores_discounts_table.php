<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoresDiscountsTable extends Migration
{

    public function up()
    {
        Schema::create('stores_discounts', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('store_id')->index();
            $table->unsignedInteger('discount_id')->index();
            $table->string('code');
            $table->date('first_date')->nullable();
            $table->date('last_date')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('store_id')->references('id')->on('stores')->onDelete('restrict')->onUpdate('restrict'); //todo check "restrict"
            $table->foreign('discount_id')->references('id')->on('discounts')->onDelete('restrict')->onUpdate('restrict'); //todo check "restrict"

        });
    }

    public function down()
    {
        Schema::dropIfExists('stores_discounts');
    }
}
