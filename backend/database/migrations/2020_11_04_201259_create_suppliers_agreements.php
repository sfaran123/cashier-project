<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSuppliersAgreements extends Migration
{

    public function up()
    {
        Schema::create('suppliers_agreements', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('employer_id')->index();
            $table->unsignedInteger('supplier_id')->index();
            $table->integer('fluent_payment_days');
            $table->float('cash_discount',8,2);
            $table->float('opening_discount',8,2);
            $table->string('comments', '90')->nullable();
            $table->softDeletes();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('employer_id')->references('id')->on('employers')->onDelete('restrict')->onUpdate('restrict'); //todo check "restrict"
            $table->foreign('supplier_id')->references('id')->on('suppliers')->onDelete('restrict')->onUpdate('restrict');//todo check "restrict"
        });
    }

    public function down()
    {
        Schema::dropIfExists('suppliers_agreements');
    }
}
