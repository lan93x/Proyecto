<?php
use App\Http\Controllers\datos;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

//Generar datos
Route::get('/datos/install', 'datos@Datosprueba');
//Home
Route::get('/getLastAnnounces', 'HomeController@getLastAnnounces');
Route::get('/getSideMenu', 'HomeController@getSideMenu');
Route::get('/', function () {
    return view('index');
});
//Anuncios
Route::get('/getAnnouncesByCategory', 'AnnounceController@getAnnouncesByCategory');
Route::get('/{Category}/B46-{Letra}{id}', 'AnnounceController@index');
Route::get('/getAnnouncesBySubcategory/{id}', 'AnnounceController@getAnnouncesBySubcategory');


//Categorias{}
Route::get('/categorias/getCategorias', 'CategoriaController@getCategorias');
Route::get('/categorias', 'CategoriaController@index');
//Route::resource('categorias', 'CategoriaController');
//Route::resource('brand', 'BrandController');


Route::get('/home', 'HomeController@index')->name('home');
