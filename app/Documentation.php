<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Documentation extends Model 
{

    protected $table = 'PRO_documentation';
    public $timestamps = true;
    protected $fillable = array('Name');

}