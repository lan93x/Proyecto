<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $table    = 'categorias';
    public $timestamps  = true;
    protected $fillable = ['id', 'idPadre', 'nombre'];

    public function anuncios()
    {
        return $this->hasMany('App\Anuncio');
    }
}
