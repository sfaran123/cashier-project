<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSuppliersTable extends Migration
{
	public function up()
	{
		Schema::create('suppliers', function (Blueprint $table) {
			$table->increments('id');
			$table->unsignedInteger('category_id')->index()->nullable();
			$table->string('name', '150');
			$table->char('business_number', 9);
			$table->string('internal_number','50')->nullable();
			$table->string('address', '150')->nullable();
			$table->text('comments')->nullable();
            $table->boolean('is_locked')->default(0);
			$table->integer('payment_due')->nullable();
			$table->integer('cash_discount')->nullable();
			$table->float('discount',8,2)->nullable();
			$table->integer('initial_discount')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable();
		});
	}

	public function down()
	{
		Schema::dropIfExists('suppliers');
	}
}
