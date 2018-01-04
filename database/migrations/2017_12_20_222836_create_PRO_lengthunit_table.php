<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePROLengthunitTable extends Migration
{
    public function up()
    {
        Schema::create('PRO_lengthunit', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('Name', 20);
        });
    }

    public function down()
    {
        Schema::drop('PRO_lengthunit');
    }
}
