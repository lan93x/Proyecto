<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Anuncio extends Model
{
    public function modelos()
    {
        return $this->belongsTo('App\Categoria');
    }
}
