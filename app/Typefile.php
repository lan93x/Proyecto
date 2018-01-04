<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Typefile extends Model 
{

    protected $table = 'Typefile';
    public $timestamps = true;
    protected $fillable = array('Name');

}