<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Condicion extends Model
{
    public $timestamps  = true;
    protected $fillable = ['id', 'nombre'];
}
