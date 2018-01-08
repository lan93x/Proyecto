<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Reply;

class Comment extends Model
{
    protected $table = 'Comment';
    public $timestamps = true;



    public function Replies()
    {
        return $this->hasMany('App\Reply');
    }


    public function Users()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }

    public function RepliesWhitUser()
    {
        return $this->Replies()->with('Users');
    }
}
