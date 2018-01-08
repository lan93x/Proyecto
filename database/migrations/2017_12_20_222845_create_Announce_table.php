<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAnnounceTable extends Migration
{
    public function up()
    {
        Schema::create('Announce', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->integer('user_id')->unsigned();
            $table->integer('product_id')->unsigned();
            $table->integer('subcategory_id')->unsigned();
            $table->string('title', 50);
            $table->string('description', 500);
            $table->date('creationdate');
            $table->string('expiredate');
            $table->string('announcecode');
            $table->string('token');
            $table->string('IsVisible');
            $table->boolean('isPaid');
            $table->boolean('isBought');
            $table->boolean('isOnSale');
            $table->double('saleprice');
            $table->double('price');
            $table->integer('visits');
            $table->string('contactname', 50);
        });
    }

    public function down()
    {
        Schema::drop('Announce');
    }
}
