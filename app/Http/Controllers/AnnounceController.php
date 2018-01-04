<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnnounceController extends Controller
{
    public function index()
    {
        return view('announces.announce');
    }

    public function getAnnouncesByCategory()
    {
        $anuncios = DB::table('Category')
        ->join('Subcategory', 'Category.id', 'Subcategory.category_id')
        ->join('Announce', 'Subcategory.id', 'Announce.subcategory_id')
        ->join('Pro_product', 'Announce.product_id', 'Pro_product.id')
        ->join('Pro_transmission', 'Pro_product.transmission_id', 'Pro_transmission.id')
        ->join('Pro_carmodel', 'Pro_product.carmodel_id', 'Pro_carmodel.id')
        ->join('Pro_color', 'Pro_product.color_id', 'Pro_color.id')
        ->join('Pro_brand', 'Pro_carmodel.brand_id', 'Pro_brand.id')
        ->join('Pro_file', 'Pro_product.id', 'Pro_file.product_id')
        ->join('Typefile', 'Pro_file.typefile_id', 'Typefile.id')
        ->where([
          ['Pro_file.title', '=', 'Principal'],
          ['Category.id', '=', 1]
          ])
        ->select(
          'Category.name As category',
          'Subcategory.name As subcategory',
          'Announce.title',
          'Announce.price As price',
          'Pro_product.year',
          'Pro_product.milleage',
          'Pro_transmission.name As transmission',
          'Pro_carmodel.name As carmodel',
          'Pro_color.name As color',
          'PRO_brand.name As brand',
          'PRO_file.fileStoragePath As image'
          )
          ->paginate(15);

        return [
          'pagination'=>[
            'total'=> $anuncios->total(),
            'current_page' => $anuncios->currentPage(),
            'per_page' => $anuncios->perPage(),
            'last_page' => $anuncios->lastPage(),
            'from'=> $anuncios->firstItem(),
            'to'=> $anuncios->lastPage(),
          ],
          'anuncios' => $anuncios
        ];
    }

    public function getAnnouncesBySubcategory($id)
    {
        $anuncios = DB::table('Category')
        ->join('Subcategory', 'Category.id', 'Subcategory.category_id')
        ->join('Announce', 'Subcategory.id', 'Announce.subcategory_id')
        ->join('Pro_product', 'Announce.product_id', 'Pro_product.id')
        ->join('Pro_transmission', 'Pro_product.transmission_id', 'Pro_transmission.id')
        ->join('Pro_carmodel', 'Pro_product.carmodel_id', 'Pro_carmodel.id')
        ->join('Pro_color', 'Pro_product.color_id', 'Pro_color.id')
        ->join('Pro_brand', 'Pro_carmodel.brand_id', 'Pro_brand.id')
        ->join('Pro_file', 'Pro_product.id', 'Pro_file.product_id')
        ->join('Typefile', 'Pro_file.typefile_id', 'Typefile.id')
        ->where([
          ['Pro_file.title', '=', 'Principal'],
          ['Subcategory.id', '=', $id]
          ])
        ->select(
          'Category.name As category',
          'Subcategory.name As subcategory',
          'Announce.title',
          'Announce.price As price',
          'Pro_product.year',
          'Pro_product.milleage',
          'Pro_transmission.name As transmission',
          'Pro_carmodel.name As carmodel',
          'Pro_color.name As color',
          'PRO_brand.name As brand',
          'PRO_file.fileStoragePath As image'
          )
          ->paginate(15);
        //return $anuncios;

        return [
          'pagination'=>[
            'total'=> $anuncios->total(),
            'current_page' => $anuncios->currentPage(),
            'per_page' => $anuncios->perPage(),
            'last_page' => $anuncios->lastPage(),
            'from'=> $anuncios->firstItem(),
            'to'=> $anuncios->lastPage(),
          ],
          'anuncios' => $anuncios
        ];
    }
}
