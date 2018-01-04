<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Announce extends Model 
{

    protected $table = 'Announce';
    public $timestamps = true;
    protected $fillable = array('product_id', 'subcategory_id', 'title', 'creationdate', 'expiredate', 'announcecode', 'token', 'IsVisible', 'isPaid', 'isBought', 'isOnSale', 'saleprice', 'price', 'visits', 'contactname');

}