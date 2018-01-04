<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePROProductTable extends Migration {

	public function up()
	{
		Schema::create('PRO_Product', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->integer('transmission_id')->unsigned();
			$table->integer('carmodel_id')->unsigned();
			$table->integer('color_id')->unsigned();
			$table->integer('lengthunit_id')->unsigned();
			$table->integer('fuel_id')->unsigned();
			$table->integer('condition_id')->unsigned();
			$table->integer('documentation_id')->unsigned();
			$table->integer('year');
			$table->integer('enginecc');
			$table->integer('milleage');
			$table->string('rowseats', 50);
		});
	}

	public function down()
	{
		Schema::drop('PRO_Product');
	}
}