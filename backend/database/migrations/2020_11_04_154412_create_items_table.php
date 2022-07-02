<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{

    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description','50');
            $table->unsignedInteger('main_category_id')->index()->nullable();
            $table->unsignedInteger('sub_category_id')->index()->nullable();
            $table->float('customer_price',8,2);
            $table->float('cost_price',8,2);
            $table->unsignedInteger('supplier_id')->index()->nullable();
            $table->char('supplier_item_code','10')->nullable();
            $table->bigInteger('code');
            $table->integer('min_chain_amount')->nullable();
            $table->integer('max_chain_amount')->nullable();
            $table->integer('min_store_amount')->nullable();
            $table->integer('max_store_amount')->nullable();
            $table->integer('cost_in_store')->nullable();
            $table->integer('cost_price_discount')->nullable();
            $table->string('bon_additional_text','50')->nullable();
            $table->date('available_from')->nullable();
            $table->date('available_to')->nullable();

            $table->boolean('is_weighable')->default(0);
            $table->boolean('includes_vat')->default(0);
            $table->boolean('is_taxed')->default(0);
            $table->boolean('is_renamed')->default(0);
            $table->boolean('is_additional_percentage')->default(0);
            $table->boolean('is_inventory_manager')->default(0);
            $table->boolean('allow_price_zero')->default(0);
            $table->boolean('has_extra')->default(0);
            $table->boolean('not_discountable')->default(0);
            $table->boolean('is_locked_for_sale')->default(0);
            $table->boolean('requires_manager')->default(0);

            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable();

            $table->foreign('main_category_id')->references('id')->on('categories')->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('sub_category_id')->references('id')->on('categories')->onDelete('restrict')->onUpdate('restrict');

            $table->foreign('supplier_id')->references('id')->on('suppliers')->onDelete('set null')->onUpdate('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('items');
    }
}
