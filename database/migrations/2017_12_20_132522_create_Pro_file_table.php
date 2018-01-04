<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProFileTable extends Migration
{
    public function up()
    {
        Schema::create('Pro_file', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->integer('product_id')->unsigned();
            $table->string('Name');
            $table->date('uploadOn');
            $table->string('fileStoragePath');
        });
    }

    public function down()
    {
        Schema::drop('Pro_file');
    }
}
