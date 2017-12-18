<?php

use Illuminate\Database\Seeder;
use App\Brand;

class BrandTableSeeder extends Seeder {

	public function run()
	{
		//DB::table('PRO_brand')->delete();

		// brand
		Brand::create(array(
				'Name' => 'Toyota'
			));
	}
}