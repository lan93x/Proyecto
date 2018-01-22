<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    public function run()
    {
        // Model::unguard();

        // $this->call('BrandTableSeeder');
        // $this->command->info('Brand table seeded!');

        // $this->call('ModelTableSeeder');
        // $this->command->info('Model table seeded!');
        $this->call(Seg_areaSeeder::class);
    }
}
