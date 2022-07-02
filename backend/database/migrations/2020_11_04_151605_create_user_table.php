<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserTable extends Migration
{

    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('organization_id')->nullable();
            $table->char('password', '64')->nullable();
            $table->enum('role', ['employer', 'admin', 'agent'])->default('employer');
            $table->string('ID_number', '30');
            $table->string('is_passport', '15')->default(0);
            $table->string('username', '120')->nullable();
            $table->string('email', '100')->nullable();
            $table->string('phone', '15')->nullable();
            $table->softDeletes();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
//            $table->foreign('organization_id')->references('id')->on('organizations')->onDelete('restrict')->onUpdate('restrict');
        });
        DB::statement('ALTER TABLE `users` ADD `is_registered` BIT(1) NOT NULL AFTER `username`');
    }

    public function down()
    {
        Schema::dropIfExists('user');
    }
}
