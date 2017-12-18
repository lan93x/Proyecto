<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnunciosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('anuncios', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('categoria_id');
            $table->integer('condicion_id');
            $table->integer('modelo_id');
            $table->integer('transmision_id');
            $table->string('titulo');
            $table->string('descripcion');
            $table->string('year');
            $table->string('motor');
            $table->string('millas');
            $table->integer('visitas');
            $table->string('codigo');
            $table->string('imagen1');
            $table->string('imagen2');
            $table->string('imagen3');
            $table->string('imagen4');
            $table->string('imagen5');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('anuncios');
    }
}
