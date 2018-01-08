<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateReplyTable extends Migration
{
    public function up()
    {
        Schema::create('Reply', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->integer('comment_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->string('text', 250);
        });
    }

    public function down()
    {
        Schema::drop('Reply');
    }
}
