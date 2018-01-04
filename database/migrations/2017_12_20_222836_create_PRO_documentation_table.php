<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePRODocumentationTable extends Migration {

	public function up()
	{
		Schema::create('PRO_documentation', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->string('Name', 50);
		});
	}

	public function down()
	{
		Schema::drop('PRO_documentation');
	}
}