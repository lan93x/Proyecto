<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPhonesAvatarAndChangeNameForFullname extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('name', 'fullname');
            $table->string('phone1', 50)->after('email')->nullable();
            $table->string('phone2', 50)->after('phone1')->nullable();
            $table->string('avatar')->after('phone2')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('fullname');
            $table->dropColumn('phone1');
            $table->dropColumn('phone2');
            $table->dropColumn('avatar');
        });
    }
}
