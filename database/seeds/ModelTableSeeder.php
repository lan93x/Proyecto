
<?php

use Illuminate\Database\Seeder;
use App\Model;

class ModelTableSeeder extends Seeder
{
    public function run()
    {
        //DB::table('PRO_model')->delete();

        // marca
        Model::create(array(
                'Name' => 'toyota',
                'brand_id' => 1
            ));
    }
}
