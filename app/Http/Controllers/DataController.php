<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Color;
use App\Transmission;
use App\Subcategory;
use App\Category;
use App\File;
use App\Documentation;
use App\Announce;
use App\CarModel;
use App\Condition;
use App\Fuel;
use App\Brand;
use App\Typefile;
use App\Product;
use App\LengthUnit;
use App\User;
use App\Comment;
use App\Reply;

class DataController extends Controller
{
    public function TestData()
    {
        //Se generan datos de prueba mediante la ruta /datos/install
        $usuarios = array(
        array('fullname'=>'Alan Arteaga', 'email'=> 'lan93x@gmail.com','password'=>'prueba'
        ,'phone1'=>'76365561','phone2'=>'76365561','avatar'=>'https://www.toptal.com/designers/subtlepatterns/patterns/dark-triangles.png'),
        array('fullname'=>'Kevin Delgadillo', 'email'=> 'kevin@gmail.com','password'=>'prueba'
        ,'phone1'=>'76365561','phone2'=>'76365561','avatar'=>'https://www.toptal.com/designers/subtlepatterns/patterns/squared-metal.png'),
        array('fullname'=>'Cecilia Jimenez', 'email'=> 'cecilia@gmail.com','password'=>'prueba'
        ,'phone1'=>'76365561','phone2'=>'76365561','avatar'=>'https://www.toptal.com/designers/subtlepatterns/patterns/halftone-yellow.png'),
        array('fullname'=>'Valeria Cabrera', 'email'=> 'valeria@gmail.com','password'=>'prueba'
        ,'phone1'=>'76365561','phone2'=>'76365561','avatar'=>'https://www.toptal.com/designers/subtlepatterns/patterns/christmas.png'),
      );
        User::insert($usuarios);

        $tipoarchivos = array(
        array('name'=> 'Anuncio'),
        array('name'=> 'Usuario'),
        array('name'=> 'Empresa'),
        array('name'=> 'Banner'),
      );
        Typefile::insert($tipoarchivos);

        $color = array(
        array('name'=> 'Rojo'),
        array('name'=> 'Plateado'),
        array('name'=> 'Negro'),
        array('name'=> 'Azul'),
        array('name'=> 'Plomo'),
        array('name'=> 'Blanco'),
      );
        Color::insert($color);

        $condicion = array(
        array('name'=> 'Nuevo'),
        array('name'=> 'Como Nuevo'),
        array('name'=> 'Usado'),
        array('name'=> 'Siniestrado'),
      );
        Condition::insert($condicion);

        $documentacion = array(
        array('name'=> 'Papeles Al Dia'),
        array('name'=> 'Consultar'),
      );
        Documentation::insert($documentacion);

        $combustibles = array(
        array('name'=> 'Gasolina'),
        array('name'=> 'Diesel'),
        array('name'=> 'Gasolina y GNV'),
        array('name'=> 'Diesel y GNV'),
      );
        Fuel::insert($combustibles);

        $metricaslongitud = array(
        array('name'=> 'Kilometros'),
        array('name'=> 'Millas'),
      );
        LengthUnit::insert($metricaslongitud);

        $transmision = array(
        array('name'=> 'Secuencial'),
        array('name'=> 'Mecanica'),
        array('name'=> 'Automatica'),
        array('name'=> 'Automatica y Secuencial'),
        array('name'=> 'Mecanica y Secuencial'),
      );
        Transmission::insert($transmision);

        $categorias = array(
        array('name'=> 'Vehiculos'),
        array('name'=> 'Accesorios'),
        array('name'=> 'Repuestos'),
      );
        Category::insert($categorias);

        $subcategorias = array(
        array('category_id'=> '1','name'=> 'Vagoneta'),
        array('category_id'=> '1','name'=> 'Sedan'),
        array('category_id'=> '1','name'=> 'Camioneta'),
        array('category_id'=> '1','name'=> 'Compacto'),
        array('category_id'=> '1','name'=> 'Jeep'),
        array('category_id'=> '1','name'=> 'Motocicleta'),
        array('category_id'=> '2','name'=> 'Radio'),
        array('category_id'=> '2','name'=> 'Iluminacion'),
        array('category_id'=> '2','name'=> 'Alarmas'),
        array('category_id'=> '3','name'=> 'Llantas'),
        array('category_id'=> '3','name'=> 'Vidrios'),
        array('category_id'=> '3','name'=> 'Amortiguadores'),
      );
        Subcategory::insert($subcategorias);

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
        array('brand_id'=>'1', 'name'=> 'Tundra'),
      );
        Carmodel::insert($modelo);

        $product = array(
        array('transmission_id'=>'2','carmodel_id'=>'1','color_id'=>'1','condition_id'=>'1','documentation_id'=>'1','fuel_id'=>'1','lengthunit_id'=>'1'
              ,'year'=>'2018', 'enginecc'=> '2800', 'milleage'=> '15648', 'rowseats'=> '3'),
        array('transmission_id'=>'2','carmodel_id'=>'2','color_id'=>'2','condition_id'=>'2','documentation_id'=>'2','fuel_id'=>'2','lengthunit_id'=>'1'
              ,'year'=>'2005', 'enginecc'=> '2000', 'milleage'=> '50000', 'rowseats'=> '2'),
        array('transmission_id'=>'3','carmodel_id'=>'3','color_id'=>'3','condition_id'=>'2','documentation_id'=>'1','fuel_id'=>'1','lengthunit_id'=>'1'
              ,'year'=>'2010', 'enginecc'=> '2000', 'milleage'=> '18500', 'rowseats'=> '2'),
        array('transmission_id'=>'2','carmodel_id'=>'4','color_id'=>'4','condition_id'=>'1','documentation_id'=>'1','fuel_id'=>'1','lengthunit_id'=>'1'
              ,'year'=>'2013', 'enginecc'=> '3000', 'milleage'=> '17000', 'rowseats'=> '3'),
        array('transmission_id'=>'3','carmodel_id'=>'5','color_id'=>'5','condition_id'=>'1','documentation_id'=>'1','fuel_id'=>'1','lengthunit_id'=>'1'
              ,'year'=>'2009', 'enginecc'=> '2000', 'milleage'=> '15648', 'rowseats'=> '2'),
        array('transmission_id'=>'2','carmodel_id'=>'6','color_id'=>'6','condition_id'=>'1','documentation_id'=>'1','fuel_id'=>'1','lengthunit_id'=>'1'
              ,'year'=>'2015', 'enginecc'=> '2500', 'milleage'=> '15648', 'rowseats'=> '2'),
        array('transmission_id'=>'4','carmodel_id'=>'7','color_id'=>'1','condition_id'=>'1','documentation_id'=>'1','fuel_id'=>'1','lengthunit_id'=>'1'
              ,'year'=>'2017', 'enginecc'=> '2000', 'milleage'=> '15648', 'rowseats'=> '2'),
        array('transmission_id'=>'5','carmodel_id'=>'8','color_id'=>'2','condition_id'=>'1','documentation_id'=>'1','fuel_id'=>'1','lengthunit_id'=>'1'
              ,'year'=>'2010', 'enginecc'=> '3000', 'milleage'=> '15648', 'rowseats'=> '2'),
        array('transmission_id'=>'2','carmodel_id'=>'9','color_id'=>'3','condition_id'=>'1','documentation_id'=>'1','fuel_id'=>'1','lengthunit_id'=>'1'
              ,'year'=>'2011', 'enginecc'=> '3500', 'milleage'=> '15648', 'rowseats'=> '2'),
      );
        Product::insert($product);

        $files = array(
        array('product_id'=>'1','product_id'=>'1', 'title'=> 'Principal', 'uploadOn'=> '2008-03-30 02:56:12', 'typefile_id'=> '1'
        , 'fileStoragePath'=> 'https://imgd.aeplcdn.com/0x0/cw/ec/19812/Toyota-Fortuner-Left-Front-Three-Quarter-99681.jpg?v=201711021421&wm=1'),
        array('product_id'=>'1', 'title'=> 'Frontal', 'uploadOn'=> '2008-03-30 02:56:12', 'typefile_id'=> '1'
        , 'fileStoragePath'=> 'https://imgd.aeplcdn.com/0x0/cw/ec/19812/Toyota-Fortuner-Front-view-99680.jpg?v=201711021421&wm=1'),
        array('product_id'=>'2', 'title'=> 'Principal', 'uploadOn'=> '2008-03-30 02:56:12', 'typefile_id'=> '1'
        , 'fileStoragePath'=> 'https://www.diariomotor.com/imagenes/picscache/1920x1600c/toyota-rav4-2013_1920x1600c.jpg'),
        array('product_id'=>'3', 'title'=> 'Principal', 'uploadOn'=> '2008-03-30 02:56:12', 'typefile_id'=> '1'
        , 'fileStoragePath'=> 'https://imgd.aeplcdn.com/1056x594/cw/ec/26588/Toyota-Corolla-Altis-Exterior-92969.jpg?v=201711021421&q=80'),
        array('product_id'=>'4', 'title'=> 'Principal', 'uploadOn'=> '2008-03-30 02:56:12', 'typefile_id'=> '1'
        , 'fileStoragePath'=> 'https://a.d-cd.net/e50e52es-480.jpg'),
        array('product_id'=>'5', 'title'=> 'Principal', 'uploadOn'=> '2008-03-30 02:56:12', 'typefile_id'=> '1'
        , 'fileStoragePath'=> 'https://acs2.blob.core.windows.net/imgcatalogo/l/VA_ace9ee0beca04e618d9bedbe2d7e5f42.jpg'),
        array('product_id'=>'6', 'title'=> 'Principal', 'uploadOn'=> '2008-03-30 02:56:12', 'typefile_id'=> '1'
        , 'fileStoragePath'=> 'https://media.ed.edmunds-media.com/nissan/murano/2015/oem/2015_nissan_murano_4dr-suv_platinum_fq_oem_1_1280.jpg'),
        array('product_id'=>'7', 'title'=> 'Principal', 'uploadOn'=> '2008-03-30 02:56:12', 'typefile_id'=> '1'
        , 'fileStoragePath'=> 'https://mcarsstatic.cachefly.net/img/vehicles/evo/2015/gallery/US0001-2015-lancer-evo-final-edition-exterior-rally-red-d.jpg'),
        array('product_id'=>'8', 'title'=> 'Principal', 'uploadOn'=> '2008-03-30 02:56:12', 'typefile_id'=> '1'
        , 'fileStoragePath'=> 'https://www.diariomotor.com/imagenes/picscache/1920x1600c/mitsubishi-montero_1920x1600c.jpg'),
        array('product_id'=>'9', 'title'=> 'Principal', 'uploadOn'=> '2008-03-30 02:56:12', 'typefile_id'=> '1'
        , 'fileStoragePath'=> 'https://cms.kelleybluebookimages.com/content/dam/kbb-editorial/make/toyota/tundra/2018/trd-sport/611x311-2018-toyota-tundra-trd-sport.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg'),
      );
        File::insert($files);

        $anuncios = array(
        array('user_id'=>'1','product_id'=>'1','subcategory_id'=>'1','title'=>'Titulo','creationdate'=>'2008-03-30 02:56:12','expiredate'=>'01/03/2015'
        ,'announcecode'=>'11111','token'=>'abc123','isVisible'=>'1', 'isPaid'=> '1', 'isBought'=> '0', 'isOnSale'=> '0'
        , 'saleprice'=> '0', 'price'=> '40000', 'visits'=> '456','contactname'=> 'Alan Arteaga'
        ,'description'=> 'Lorem ipsum dolor sit amdunt ut labore et dolore ma veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proidentm.'),
        array('user_id'=>'2','product_id'=>'2','subcategory_id'=>'1','title'=>'Titulo','creationdate'=>'2009-03-30 02:56:12','expiredate'=>'01/03/2015'
        ,'announcecode'=>'11111','token'=>'abc123','isVisible'=>'1', 'isPaid'=> '1', 'isBought'=> '0', 'isOnSale'=> '0'
        , 'saleprice'=> '0', 'price'=> '30000', 'visits'=> '456','contactname'=> 'Alan Arteaga'
      ,'description'=> 'Lorem ipsum dolor sit amet, consectim veniam, quis nostrud exercitation ullamco laorum.'),
        array('user_id'=>'3','product_id'=>'3','subcategory_id'=>'2','title'=>'Titulo','creationdate'=>'2010-03-30 02:56:12','expiredate'=>'01/03/2015'
        ,'announcecode'=>'11111','token'=>'abc123','isVisible'=>'1', 'isPaid'=> '1', 'isBought'=> '0', 'isOnSale'=> '0'
        , 'saleprice'=> '0', 'price'=> '17000', 'visits'=> '456','contactname'=> 'Alan Arteaga'
        ,'description'=> 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla rum.'),
        array('user_id'=>'4','product_id'=>'4','subcategory_id'=>'1','title'=>'Titulo','creationdate'=>'2013-03-30 02:56:12','expiredate'=>'01/03/2015'
        ,'announcecode'=>'11111','token'=>'abc123','isVisible'=>'1', 'isPaid'=> '1', 'isBought'=> '0', 'isOnSale'=> '0'
        , 'saleprice'=> '0', 'price'=> '60000', 'visits'=> '456','contactname'=> 'Alan Arteaga'
        ,'description'=> 'Lorem ipsut labore et dolore magn exercitation ullamco lacommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
        array('user_id'=>'1','product_id'=>'5','subcategory_id'=>'2','title'=>'Titulo','creationdate'=>'2014-03-30 02:56:12','expiredate'=>'01/03/2015'
        ,'announcecode'=>'11111','token'=>'abc123','isVisible'=>'1', 'isPaid'=> '1', 'isBought'=> '0', 'isOnSale'=> '0'
        , 'saleprice'=> '0', 'price'=> '35000', 'visits'=> '456','contactname'=> 'Alan Arteaga'
        ,'description'=> 'Loremabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur id est laborum.'),
        array('user_id'=>'2','product_id'=>'6','subcategory_id'=>'1','title'=>'Titulo','creationdate'=>'2015-03-30 02:56:12','expiredate'=>'01/03/2015'
        ,'announcecode'=>'11111','token'=>'abc123','isVisible'=>'1', 'isPaid'=> '1', 'isBought'=> '0', 'isOnSale'=> '0'
        , 'saleprice'=> '0', 'price'=> '28000', 'visits'=> '456','contactname'=> 'Alan Arteaga'
        ,'description'=> 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in.'),
        array('user_id'=>'3','product_id'=>'7','subcategory_id'=>'2','title'=>'Titulo','creationdate'=>'2016-03-30 02:56:12','expiredate'=>'01/03/2015'
        ,'announcecode'=>'11111','token'=>'abc123','isVisible'=>'1', 'isPaid'=> '1', 'isBought'=> '0', 'isOnSale'=> '0'
        , 'saleprice'=> '0', 'price'=> '15000', 'visits'=> '456','contactname'=> 'Alan Arteaga'
        ,'description'=> 'Lorem ididunt ut labore et dolore s nostrud exeruip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
        array('user_id'=>'4','product_id'=>'8','subcategory_id'=>'1','title'=>'Titulo','creationdate'=>'2017-03-30 02:56:12','expiredate'=>'01/03/2015'
        ,'announcecode'=>'11111','token'=>'abc123','isVisible'=>'1', 'isPaid'=> '1', 'isBought'=> '0', 'isOnSale'=> '0'
        , 'saleprice'=> '0', 'price'=> '38000', 'visits'=> '456','contactname'=> 'Alan Arteaga'
        ,'description'=> 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit essunt in culpa qui officia deserunt mollit anim id est laborum.'),
        array('user_id'=>'1','product_id'=>'9','subcategory_id'=>'3','title'=>'Titulo','creationdate'=>'2008-03-30 02:56:12','expiredate'=>'01/03/2015'
        ,'announcecode'=>'11111','token'=>'abc123','isVisible'=>'1', 'isPaid'=> '1', 'isBought'=> '0', 'isOnSale'=> '0'
        , 'saleprice'=> '0', 'price'=> '45000', 'visits'=> '456','contactname'=> 'Alan Arteaga'
        ,'description'=> 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod o laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
      );
        Announce::insert($anuncios);

        $comentarios = array(
        array('announce_id'=>'1', 'text'=> 'Le dije a mi me gusta el rock','user_id'=>'1'),
        array('announce_id'=>'1', 'text'=> 'cuando escribi en una hoja de un blog','user_id'=>'2'),
      );
        Comment::insert($comentarios);

        $respuestas = array(
        array('comment_id'=>'1', 'text'=> 'pero quedo en estado de shock','user_id'=>'3'),
        array('comment_id'=>'2', 'text'=> 'que era mas fea que el senor spock','user_id'=>'4'),

      );
        Reply::insert($respuestas);


        return "Todos los Registros se Agregaron de manera Correcta";
    }
}
