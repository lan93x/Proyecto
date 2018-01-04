<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Category;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('index');
    }

    public function getLastAnnounces()
    {
        //Se listan los ultimos 5 anuncios registrados
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
        ->where('Pro_file.title', '=', 'Principal')
        ->orderBy('Announce.id', 'desc')
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
        ->take(5)
        ->get();
        return $anuncios;
        //   return [
      //   'pagination'=>[
      //     'total'=> 1,
      //     'current_page' => 1,
      //     'per_page' => 1,
      //     'last_page' =>1,
      //     'from'=> 1,
      //     'to'=> 1,
      //   ],
      //   'anuncios' => $anuncios
      // ];
    }

    public function getSideMenu()
    {
        //   $subcategories = DB::table('Category')
        // ->join('Subcategory', 'Category.id', 'Subcategory.category_id')
        // ->select(
        //   'Category.name As category',
        //   'Subcategory.name As subcategory'
        //   )
        // ->get();

        $subcategories=Category::with('subcategories')->get();

        return $subcategories;
    }
}
