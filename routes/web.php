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

Route::get('/', function () {
    return view('pages.index');
});

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
Route::get('/auth/facebook/callback','SocialAuthController@callback');
// Route::post('/auth/facebook/register','SocialAuthController@register');


Route::get('/datos/install', 'datos@Datosprueba');

//Categorias
Route::get('/categorias/getCategorias', 'CategoriaController@getCategorias');
Route::resource('categorias', 'CategoriaController');
Route::resource('brand', 'BrandController');


Route::get('/home', 'HomeController@index')->name('home');
