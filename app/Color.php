<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Color extends Model 
{

    protected $table = 'PRO_color';
    public $timestamps = true;
    protected $fillable = array('Name');

}