<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Brand;
use App\CarModel;

class datos extends Controller
{
    public function Datosprueba()
    {
        // $categorias = array(
        //   array('idPadre'=>'0', 'nombre'=> 'Vehiculos'),
        //   array('idPadre'=>'0', 'nombre'=> 'Accesorios'),
        //   array('idPadre'=>'0', 'nombre'=> 'Repuestos'),
        //   array('idPadre'=>'1', 'nombre'=> 'Vagoneta'),
        //   array('idPadre'=>'1', 'nombre'=> 'Sedan'),
        //   array('idPadre'=>'1', 'nombre'=> 'Camioneta')
        // );
        // Categoria::insert($categorias);
        //
        // $Condicion = array(
        //   array('nombre'=> 'Nuevo'),
        //   array('nombre'=> 'Como Nuevo'),
        //   array('nombre'=> 'Seminuevo'),
        // );
        // Condicion::insert($Condicion);
        //
        // $transmision = array(
        //   array('nombre'=> 'Mecanica'),
        //   array('nombre'=> 'Secuencial'),
        //   array('nombre'=> 'Automatica'),
        //   array('nombre'=> 'Automatica y Secuencial'),
        // );
        // Transmision::insert($transmision);

        $marca = array(
          array('name'=> 'Toyota'),
          array('name'=> 'Nissan'),
          array('name'=> 'Mitsubishi'),
        );
        Brand::insert($marca);

        $modelo = array(
          array('brand_id'=>'1', 'name'=> 'Fortuner'),
          array('brand_id'=>'1', 'name'=> 'Rav4'),
          array('brand_id'=>'1', 'name'=> 'Corolla'),
          array('brand_id'=>'2', 'name'=> 'Patrol'),
          array('brand_id'=>'2', 'name'=> 'Sentra'),
          array('brand_id'=>'2', 'name'=> 'Murano'),
          array('brand_id'=>'3', 'name'=> 'Lancer'),
          array('brand_id'=>'3', 'name'=> 'Montero'),
        );
        CarModel::insert($modelo);


        //   $db = new mysqli("localhost", "root", "", "proyecto");
        //   mysqli_query($db, "SET NAMES 'utf8'");
        //
        //   $sql = array(
        //   "INSERT INTO categorias VALUES(NULL,'0','Vehiculos')",
        //   "INSERT INTO categorias VALUES(NULL,'0','Accesorios')",
        //   "INSERT INTO categorias VALUES(NULL,'0','Repuestos')"
        // );
        //
        //   foreach ($sql as $value) {
        //       mysqli_query($db, $value);
        //   }

        return "hola";
    }
}
