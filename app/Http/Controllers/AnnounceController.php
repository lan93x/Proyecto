<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Comment;

class AnnounceController extends Controller
{
    public function index()
    {
        return view('announces.announce');
    }

    public function detAnnounce()
    {
        return view('announces.detannounce');
    }

    public function getAnnouncesByCategory($id)
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
          ['Category.id', '=', $id]
          ])
        ->select(
          'Category.name As category',
          'Subcategory.name As subcategory',
          'Announce.title',
          'Announce.id',
          'Announce.description',
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
          'Announce.id',
          'Announce.description',
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

    public function getDetailAnnounce($id)
    {
        $comentarios = Comment::with('Users', 'RepliesWhitUser')
        ->where('announce_id', '=', $id)
        ->get();
        $anuncio = DB::table('Category')
      ->join('Subcategory', 'Category.id', 'Subcategory.category_id')
      ->join('Announce', 'Subcategory.id', 'Announce.subcategory_id')
      ->join('Users', 'users.id', 'Announce.user_id')
      ->join('Pro_product', 'Announce.product_id', 'Pro_product.id')
      ->join('Pro_transmission', 'Pro_product.transmission_id', 'Pro_transmission.id')
      ->join('Pro_carmodel', 'Pro_product.carmodel_id', 'Pro_carmodel.id')
      ->join('Pro_color', 'Pro_product.color_id', 'Pro_color.id')
      ->join('Pro_brand', 'Pro_carmodel.brand_id', 'Pro_brand.id')
      ->join('Pro_condition', 'Pro_product.condition_id', 'Pro_condition.id')
      ->join('Pro_fuel', 'Pro_product.fuel_id', 'Pro_fuel.id')
      ->join('PRO_documentation', 'Pro_product.documentation_id', 'PRO_documentation.id')
      ->join('PRO_lengthunit', 'Pro_product.lengthunit_id', 'PRO_lengthunit.id')
      ->join('Pro_file', 'Pro_product.id', 'Pro_file.product_id')
      ->join('Typefile', 'Pro_file.typefile_id', 'Typefile.id')
      ->where([
        ['Pro_file.title', '=', 'Principal'],
        ['Announce.id', '=', $id]
        ])
      ->select(
        'Category.name As category',
        'Subcategory.name As subcategory',
        'Announce.title',
        'Announce.price As price',
        'Announce.id',
        'Announce.description',
        'Announce.visits',
        'Users.fullname',
        'Users.email',
        'Users.phone1',
        'Users.avatar',
        'Pro_product.year',
        'Pro_product.milleage',
        'Pro_transmission.name As transmission',
        'Pro_carmodel.name As carmodel',
        'Pro_color.name As color',
        'PRO_brand.name As brand',
        'PRO_fuel.name As fuel',
        'PRO_documentation.name As documentation',
        'PRO_lengthunit.name As lengthunit',
        'Pro_condition.name As condition',
        'PRO_file.fileStoragePath As image'
        )
        ->get();

        return ['anuncio' => $anuncio, 'comentarios' => $comentarios];
    }
}
