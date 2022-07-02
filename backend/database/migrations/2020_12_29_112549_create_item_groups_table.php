<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemGroupsTable extends Migration
{
    public function up()
    {
        Schema::create('group_items', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('item_id')->index();
            $table->unsignedInteger('group_id')->index();
            $table->integer('index')->nullable();
            $table->integer('customer_price')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('item_id')->references('id')->on('items')->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('group_id')->references('id')->on('groups')->onDelete('restrict')->onUpdate('restrict');
        });
    }
    public function down()
    {
        Schema::dropIfExists('group_items');
    }
}
