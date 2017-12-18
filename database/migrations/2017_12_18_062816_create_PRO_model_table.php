<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePROModelTable extends Migration {

	public function up()
	{
		Schema::create('PRO_model', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->string('Name');
			$table->integer('brand_id')->unsigned();
		});
	}

	public function down()
	{
		Schema::drop('PRO_model');
	}
}