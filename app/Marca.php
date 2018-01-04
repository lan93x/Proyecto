<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Marca extends Model
{
    public $timestamps  = true;
    protected $fillable = ['id', 'nombre', 'pais', 'logo'];

    public function modelos()
    {
        return $this->hasMany('App\CarModel');
    }
}
