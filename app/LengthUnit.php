<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LengthUnit extends Model 
{

    protected $table = 'PRO_lengthunit';
    public $timestamps = true;
    protected $fillable = array('Name');

}