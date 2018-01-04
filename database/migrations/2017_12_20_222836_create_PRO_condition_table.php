<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePROConditionTable extends Migration {

	public function up()
	{
		Schema::create('PRO_condition', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->string('Name', 25);
		});
	}

	public function down()
	{
		Schema::drop('PRO_condition');
	}
}