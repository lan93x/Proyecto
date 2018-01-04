<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'Category';
    public $timestamps = true;

    public function subcategories()
    {
        return $this->hasMany('App\Subcategory');
    }
}
