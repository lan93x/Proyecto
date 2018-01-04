<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model 
{

    protected $table = 'Pro_file';
    public $timestamps = true;
    protected $fillable = array('product_id', 'title', 'uploadOn', 'fileStoragePath', 'typefile_id');

}