<?php

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
Route::get('/ola', function () {
    return view('ola');
});

Route::get('/wel', function () {
    return view('welcome');
});
Route::get('auth/face', function () {
    return view('facebook');
});
Auth::routes();

//autentificacion con facebook
Route::get('/auth/facebook', 'SocialAuthController@facebook');
Route::get('/auth/facebook/callback', 'SocialAuthController@callback');
// Route::post('/auth/facebook/register','SocialAuthController@register');

//Generar datos
Route::get('/install', 'DataController@TestData');
//Home
Route::get('/getLastAnnounces', 'HomeController@getLastAnnounces');
Route::get('/getSideMenu', 'HomeController@getSideMenu');
Route::get('/', function () {
    return view('index');
});
//Anuncios
Route::get('/{Category}/B46-{Letra}{id}', 'AnnounceController@index');
Route::get('/getAnnouncesByCategory/{id}', 'AnnounceController@getAnnouncesByCategory');
Route::get('/getAnnouncesBySubcategory/{id}', 'AnnounceController@getAnnouncesBySubcategory');
Route::get('/Anuncio/@{id}', 'AnnounceController@detAnnounce');
Route::get('/getDetailAnnounce/{id}', 'AnnounceController@getDetailAnnounce');

//Categorias{}
Route::get('/categorias/getCategorias', 'CategoriaController@getCategorias');
Route::get('/categorias', 'CategoriaController@index');
//Route::resource('categorias', 'CategoriaController');
//Route::resource('brand', 'BrandController');

//-----------------administracion-----------------------------
//area
// Route::group(['prefix' => 'administracion/'], function () {
    Route::get('admin/api-area', 'Seg_areaController@getData');
    Route::get('area', 'Seg_areaController@index');

// });
//--------------------------------------------------------------

Route::get('/home', 'HomeController@index')->name('home');
