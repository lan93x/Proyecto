let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.scripts([
  'resources/assets/js/jquery.js',
  'semantic/dist/semantic.min.js',
  'resources/assets/js/toastr.js',
  'resources/assets/js/moment.js',
  'resources/assets/js/vue.js',
  'resources/assets/js/axios.js',
  'resources/assets/js/app.js',
  ],'public/js/app.js')
  .styles([
    'semantic/dist/semantic.min.css',
    'resources/assets/css/toastr.css',
    'resources/assets/css/default.css',
  ], 'public/css/app.css')
  .fonts;
