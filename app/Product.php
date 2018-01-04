<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model 
{

    protected $table = 'PRO_Product';
    public $timestamps = true;
    protected $fillable = array('transmission_id', 'carmodel_id', 'color_id', 'lengthunit_id', 'fuel_id', 'condition_id', 'documentation_id', 'year', 'enginecc', 'milleage', 'rowseats');

}