<?php
use App\Seg_area;
use Faker\Factory;
use Illuminate\Database\Seeder;

class Seg_areaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();

        Seg_area::truncate();

        foreach (range(1, 50) as $i) {
            Seg_area::create([
                'namearea' => $faker->sentence(1),
            ]);
        }
    }
}
