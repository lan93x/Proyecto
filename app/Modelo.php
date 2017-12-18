<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Marca;

class Modelo extends Model
{
    public $timestamps = true;
    protected $fillable = ['id','idPadre','nombre'];

    public function marcas()
    {
        return $this->belongsTo('App\Marca');
    }
}
