<!DOCTYPE doctype html>
<html lang="es">
    <head>
        <meta charset="utf-8">
            <meta content="IE=edge" http-equiv="X-UA-Compatible">
                <meta content="width=device-width, initial-scale=1" name="viewport">
                    <title>
                        Laravel
                    </title>
                    <!-- Fonts -->
                    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
                        <!-- Styles -->
                        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
                        </link>
                    </link>
                </meta>
            </meta>
        </meta>
    </head>
    <body>
        <div id="app">
            @include('inc.nav')
            <div class="ui container fluid">
                @yield('content')
            </div>
            <div class="ui divider">
            </div>
            <div class="ui fluid container">
                @include('inc.footer')
            </div>
        </div>
        <script src="{{ asset('js/app.js') }}">
        </script>
        
    </body>
</html>
