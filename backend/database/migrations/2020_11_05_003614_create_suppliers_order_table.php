<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSuppliersOrderTable extends Migration
{

    public function up()
    {
        Schema::create('suppliers_order', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('supplier_id')->index();
            $table->string('description','200');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('supplier_id')->references('id')->on('suppliers')->onDelete('restrict')->onUpdate('restrict'); //todo check "restrict"

        });
    }


    public function down()
    {
        Schema::dropIfExists('suppliers_order');
    }
}
