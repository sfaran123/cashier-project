<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployersTable extends Migration
{

    public function up()
    {
        Schema::create('employers', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('organization_id');
            $table->string('name', '100');
            $table->char('business_number', '9');
            $table->string('email', '90')->nullable();
            $table->string('phone', '15')->nullable();
            $table->string('address', '50')->nullable();
            $table->unsignedInteger('agent_id')->nullable();
            $table->softDeletes();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('organization_id')->references('id')->on('organizations')->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('agent_id')->references('id')->on('agents')->onDelete('restrict')->onUpdate('restrict');
        });
        DB::statement("ALTER TABLE `employers` ADD `is_active` BIT(1) NOT NULL DEFAULT b'1' AFTER `agent_id`");

    }

    public function down()
    {
        Schema::dropIfExists('employers');
    }
}
