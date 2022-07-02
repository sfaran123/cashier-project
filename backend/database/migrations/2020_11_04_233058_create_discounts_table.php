<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDiscountsTable extends Migration
{

    public function up()
    {
        Schema::create('discounts', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('employer_id')->index();
            $table->string('name', '40');
            $table->string('type', '20');
            $table->date('first_date')->nullable();
            $table->date('last_date')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('employer_id')->references('id')->on('employers')->onDelete('restrict')->onUpdate('restrict'); //todo check "restrict"
        });

        DB::statement("ALTER TABLE `discounts` ADD `is_active` BIT(1) NOT NULL DEFAULT b'1' AFTER `last_date`");
        DB::statement("ALTER TABLE `discounts` ADD `club_members_only` BIT(1) NOT NULL DEFAULT b'0' AFTER `is_active`");
        DB::statement("ALTER TABLE `discounts` ADD `is_automatically_activate` BIT(1) NOT NULL DEFAULT b'0' AFTER `club_members_only`"); //המבצע מופעל בצורה אוטמטית - אם תיבה זו לא מסומנת אז המערכת תשאל את הקופאי האם להפעיל מבצע זה בסוף החשבון
    }

    public function down()
    {
        Schema::dropIfExists('discounts');
    }
}
