<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transmision extends Model
{
    public $timestamps = true;
    protected $fillable = ['id','nombre'];
}
