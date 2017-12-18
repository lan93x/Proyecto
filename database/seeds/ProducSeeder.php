<?php

use Illuminate\Database\Seeder;
use App\Producto;

class ProducSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Producto::class,80)->create();
    }
}
