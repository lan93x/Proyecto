<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Condition extends Model 
{

    protected $table = 'PRO_condition';
    public $timestamps = true;
    protected $fillable = array('Name');

}