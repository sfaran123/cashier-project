<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{

    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('parent_id')->nullable();
//          $table->unsignedInteger('employee_id')->nullable();     //todo
            $table->char('ID_number',9);
            $table->string('first_name', '50');
            $table->string('last_name', '50');
            $table->date('birth_date')->nullable();
            $table->string('phone1', '15')->nullable();
            $table->string('phone2', '15')->nullable();
            $table->string('address', '50')->nullable();
            $table->string('email', '90')->nullable();
            $table->string('comment', '90')->nullable();
            $table->string('tag_number', '10')->nullable();
            $table->boolean('is_shipping_document')->default(1);
            $table->boolean('has_obligo_renews')->default(1);
            $table->boolean('is_locked')->default(0);
            $table->boolean('is_blocked')->default(0);
            $table->boolean('is_elat_resident')->default(0);
            $table->boolean('is_parent')->default(0);
            $table->boolean('own_price')->default(0)->nullable();
            $table->integer('obligo')->nullable();
            $table->integer('balance')->nullable();
            $table->enum('printer_type', ['pos_printer', 'a4_printer', 'croupier_option'])->nullable();
            $table->enum('terms_of_payment', ['x', 'y', 'z'])->nullable();
            $table->float('discount_percentage', 8,2)->nullable();
            $table->softDeletes();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable();

//            $table->foreign('employee_id')->references('id')->on('employees')->onDelete('restrict')->onUpdate('restrict');

        });
    }

    public function down()
    {
        Schema::dropIfExists('customers');
    }
}
