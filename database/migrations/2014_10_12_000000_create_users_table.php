<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'users';
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->unsignedBigInteger('company_id')->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('direct_phone')->nullable();
            $table->string('mobile_phone')->nullable();
            $table->string('profile_pic')->nullable();
            $table->string('address', 500)->nullable();
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamp('last_login')->nullable();
            $table->integer('total_logins')->default(0);
            $table->boolean('can_be_tagged')->default(1);
            $table->boolean('on_leave')->default(0);
            $table->date('return_date')->nullable();
            $table->boolean('disabled')->default(0);
            $table->boolean('hide_inactive_users')->default(0);
            $table->integer('access_id')->default(0);
            $table->timestamp('last_seen')->nullable();
            $table->rememberToken();
            $table->bigInteger('deleted_by')->unsigned()->nullable();
            $table->softDeletes();
            $table->nullableTimestamps();


            $table->foreign('deleted_by', 'fk_users_deleted_by1_idx')
                ->references('id')->on('users')
                ->onDelete('no action')
                ->onUpdate('no action');


            $table->index('username', 'ix_users_username');
            $table->index('email', 'ix_users_email');
            $table->index('uuid', 'ix_users_uuid');
            $table->index('disabled', 'ix_users_disabled');
            $table->index('access_id', 'ix_users_access_id');
            $table->index('company_id', 'ix_users_company_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table($this->tableName, function (Blueprint $table){
            $table->dropForeign('fk_users_deleted_by1_idx');
            $table->dropIndex('ix_users_username');
            $table->dropIndex('ix_users_email');
            $table->dropIndex('ix_users_uuid');
            $table->dropIndex('ix_users_disabled');
            $table->dropIndex('ix_users_access_id');


        });
        Schema::dropIfExists('users');
    }
}
