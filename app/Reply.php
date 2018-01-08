<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    protected $table = 'Reply';
    public $timestamps = true;

    public function Users()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }
}
