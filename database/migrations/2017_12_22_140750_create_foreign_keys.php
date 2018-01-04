<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Eloquent\Model;

class CreateForeignKeys extends Migration {

	public function up()
	{
		Schema::table('Subcategory', function(Blueprint $table) {
			$table->foreign('category_id')->references('id')->on('Category')
						->onDelete('restrict')
						->onUpdate('restrict');
		});
		Schema::table('PRO_carmodel', function(Blueprint $table) {
			$table->foreign('brand_id')->references('id')->on('PRO_brand')
						->onDelete('restrict')
						->onUpdate('restrict');
		});
		Schema::table('PRO_Product', function(Blueprint $table) {
			$table->foreign('transmission_id')->references('id')->on('PRO_transmission')
						->onDelete('restrict')
						->onUpdate('restrict');
		});
		Schema::table('PRO_Product', function(Blueprint $table) {
			$table->foreign('carmodel_id')->references('id')->on('PRO_carmodel')
						->onDelete('restrict')
						->onUpdate('restrict');
		});
		Schema::table('PRO_Product', function(Blueprint $table) {
			$table->foreign('color_id')->references('id')->on('PRO_color')
						->onDelete('restrict')
						->onUpdate('restrict');
		});
		Schema::table('PRO_Product', function(Blueprint $table) {
			$table->foreign('lengthunit_id')->references('id')->on('PRO_lengthunit')
						->onDelete('restrict')
						->onUpdate('restrict');
		});
		Schema::table('PRO_Product', function(Blueprint $table) {
			$table->foreign('fuel_id')->references('id')->on('PRO_fuel')
						->onDelete('restrict')
						->onUpdate('restrict');
		});
		Schema::table('PRO_Product', function(Blueprint $table) {
			$table->foreign('condition_id')->references('id')->on('PRO_condition')
						->onDelete('restrict')
						->onUpdate('restrict');
		});
		Schema::table('PRO_Product', function(Blueprint $table) {
			$table->foreign('documentation_id')->references('id')->on('PRO_documentation')
						->onDelete('restrict')
						->onUpdate('restrict');
		});
		Schema::table('Announce', function(Blueprint $table) {
			$table->foreign('product_id')->references('id')->on('PRO_Product')
						->onDelete('restrict')
						->onUpdate('restrict');
		});
		Schema::table('Announce', function(Blueprint $table) {
			$table->foreign('subcategory_id')->references('id')->on('Subcategory')
						->onDelete('restrict')
						->onUpdate('restrict');
		});
		Schema::table('Pro_file', function(Blueprint $table) {
			$table->foreign('product_id')->references('id')->on('PRO_Product')
						->onDelete('restrict')
						->onUpdate('restrict');
		});
		Schema::table('Pro_file', function(Blueprint $table) {
			$table->foreign('typefile_id')->references('id')->on('Typefile')
						->onDelete('restrict')
						->onUpdate('restrict');
		});
	}

	public function down()
	{
		Schema::table('Subcategory', function(Blueprint $table) {
			$table->dropForeign('Subcategory_category_id_foreign');
		});
		Schema::table('PRO_carmodel', function(Blueprint $table) {
			$table->dropForeign('PRO_carmodel_brand_id_foreign');
		});
		Schema::table('PRO_Product', function(Blueprint $table) {
			$table->dropForeign('PRO_Product_transmission_id_foreign');
		});
		Schema::table('PRO_Product', function(Blueprint $table) {
			$table->dropForeign('PRO_Product_carmodel_id_foreign');
		});
		Schema::table('PRO_Product', function(Blueprint $table) {
			$table->dropForeign('PRO_Product_color_id_foreign');
		});
		Schema::table('PRO_Product', function(Blueprint $table) {
			$table->dropForeign('PRO_Product_lengthunit_id_foreign');
		});
		Schema::table('PRO_Product', function(Blueprint $table) {
			$table->dropForeign('PRO_Product_fuel_id_foreign');
		});
		Schema::table('PRO_Product', function(Blueprint $table) {
			$table->dropForeign('PRO_Product_condition_id_foreign');
		});
		Schema::table('PRO_Product', function(Blueprint $table) {
			$table->dropForeign('PRO_Product_documentation_id_foreign');
		});
		Schema::table('Announce', function(Blueprint $table) {
			$table->dropForeign('Announce_product_id_foreign');
		});
		Schema::table('Announce', function(Blueprint $table) {
			$table->dropForeign('Announce_subcategory_id_foreign');
		});
		Schema::table('Pro_file', function(Blueprint $table) {
			$table->dropForeign('Pro_file_product_id_foreign');
		});
		Schema::table('Pro_file', function(Blueprint $table) {
			$table->dropForeign('Pro_file_typefile_id_foreign');
		});
	}
}