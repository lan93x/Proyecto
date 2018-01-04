<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSubcategoryTable extends Migration {

	public function up()
	{
		Schema::create('Subcategory', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->string('Name', 25);
			$table->integer('category_id')->unsigned();
		});
	}

	public function down()
	{
		Schema::drop('Subcategory');
	}
}