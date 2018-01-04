<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePROTransmissionTable extends Migration {

	public function up()
	{
		Schema::create('PRO_transmission', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->string('Name', 25);
		});
	}

	public function down()
	{
		Schema::drop('PRO_transmission');
	}
}