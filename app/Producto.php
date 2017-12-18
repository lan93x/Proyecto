<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $filiable = [
      'name','short','body',
    ];
}
