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
            $table->string('title');
            $table->date('uploadOn');
            $table->string('fileStoragePath', 250);
            $table->integer('typefile_id')->unsigned();
        });
    }

    public function down()
    {
        Schema::drop('Pro_file');
    }
}
