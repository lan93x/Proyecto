<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePROBrandTable extends Migration {

	public function up()
	{
		Schema::create('PRO_brand', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->string('Name', 25);
		});
	}

	public function down()
	{
		Schema::drop('PRO_brand');
	}
}