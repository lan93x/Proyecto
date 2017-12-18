<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder {

	public function run()
	{
		Model::unguard();

		$this->call('BrandTableSeeder');
		$this->command->info('Brand table seeded!');

		$this->call('ModelTableSeeder');
		$this->command->info('Model table seeded!');
	}
}