<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    </head>
    <body>
      <div id="app">
        @include('inc.nav')
        <div class="ui container">
          <div class="ui grid">
          <div class="three wide column">
            @include('inc.sidemenubar')
          </div>
          <div class="thirteen wide column">
            @yield('content')
          </div>

        </div>
      </div>
      {{-- <div class="ui fluid container">
  @include('inc.footer')
      </div>

          {{-- <div class="ui divider"></div> --}}

      </div>
      <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
