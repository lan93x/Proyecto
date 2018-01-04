<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Carmodel extends Model
{
    protected $table = 'PRO_carmodel';
    public $timestamps = true;
    protected $fillable = array('id', 'Name', 'brand_id');

    public function marca()
    {
        return $this->hasOne('App\Brand');
    }
}
