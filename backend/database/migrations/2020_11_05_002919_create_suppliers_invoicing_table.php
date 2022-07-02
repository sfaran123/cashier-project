<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSuppliersInvoicingTable extends Migration
{

    public function up()
    {
        Schema::create('suppliers_invoicing', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('supplier_id')->index();
            $table->string('reference_number');
            $table->date('document_date')->index();
            //todo: get all the detail of the invoicing
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('supplier_id')->references('id')->on('suppliers')->onDelete('restrict')->onUpdate('restrict'); //todo check "restrict"

        });
    }


    public function down()
    {
        Schema::dropIfExists('suppliers_invoicing');
    }
}
