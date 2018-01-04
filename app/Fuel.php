<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Fuel extends Model 
{

    protected $table = 'PRO_fuel';
    public $timestamps = true;
    protected $fillable = array('Name');

}