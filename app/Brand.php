<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $table    = 'PRO_brand';
    public $timestamps  = true;
    protected $fillable = array('id', 'Name');

    public function modelos()
    {
        return $this->hasMany('App\CarModel');
    }
}
