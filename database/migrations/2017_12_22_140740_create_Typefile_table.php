<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTypefileTable extends Migration {

	public function up()
	{
		Schema::create('Typefile', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->string('Name');
		});
	}

	public function down()
	{
		Schema::drop('Typefile');
	}
}