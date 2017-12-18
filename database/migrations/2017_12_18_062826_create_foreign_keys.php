<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Eloquent\Model;

class CreateForeignKeys extends Migration
{
    public function up()
    {
        Schema::table('PRO_model', function (Blueprint $table) {
            $table->foreign('brand_id')->references('id')->on('PRO_brand')
                        ->onDelete('restrict')
                        ->onUpdate('restrict');
        });
    }

    public function down()
    {
        Schema::table('PRO_model', function (Blueprint $table) {
            $table->dropForeign('PRO_model_brand_id_foreign');
        });
    }
}
