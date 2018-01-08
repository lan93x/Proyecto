<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCommentTable extends Migration {

	public function up()
	{
		Schema::create('Comment', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->integer('announce_id')->unsigned();
			$table->string('text', 250);
			$table->integer('user_id')->unsigned();
		});
	}

	public function down()
	{
		Schema::drop('Comment');
	}
}