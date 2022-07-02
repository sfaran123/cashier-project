<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{

    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->increments('id');
            $table->string('id_number', '10');
            $table->string('name', '40');
            $table->string('magnetic_card', '100')->nullable();
            $table->string('external_id', '50')->comment('קוד עובד לצורך יצוא למערכת שעות חיצונית כגון מכפל');
            $table->enum('gender', ['male','female','other']);
            $table->string('address', '15')->nullable();
            $table->string('phone', '15')->nullable();
            $table->date('birth_date')->nullable();
            $table->date('work_start_date')->nullable();
            $table->boolean('is_cashier')->default(0);
            $table->boolean('is_delivery_person')->default(0);
            $table->boolean('is_manager')->default(0);
            $table->boolean('is_minus_approve')->default(0);
            $table->boolean('is_discount_approve')->default(0);
            $table->boolean('can_view_report')->default(0);
            $table->boolean('can_run_z')->default(0);
            $table->boolean('can_view_x')->default(0);
            $table->boolean('can_make_refund')->default(0);
            $table->boolean('can_delete_sales')->default(0);
            $table->boolean('can_change_price')->default(0);
            $table->boolean('is_active')->default(1);
            $table->boolean('by_shift_calculation')->default(0);
            $table->string('contact_name', '40')->nullable();
            $table->string('contact_phone', '15')->nullable();
            $table->string('contact_closeness', '50')->nullable();
            $table->string('bank_id', '20')->nullable();
            $table->string('bank_branch_id', '20')->nullable();
            $table->string('bank_account_number', '20')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

        });
    }


    public function down()
    {
        Schema::dropIfExists('employees');
    }
}
