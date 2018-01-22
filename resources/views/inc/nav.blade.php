<div class="ui large top hidden menu">
    <div class="ui container fluid">
        <a class="active item" href="{{ url('/') }}">
            {{ config('APP_NAME', 'Elproyecto') }}
        </a>
        {{--
        <a class="item">
            Work
        </a>
        <a class="item">
            Company
        </a>
        <a class="item">
            Careers
        </a>
        --}}
        <div class="right menu">
            @if (Auth::guest())
            <div class="item">
                <a class="nav-link" href="{{ route('login') }}">
                    Entrar
                </a>
            </div>
            <div class="item">
                <a class="nav-link" href="{{ route('register') }}">
                    Registrarse
                </a>
            </div>
            @else
            <div class="ui compact menu">
                <div class="ui simple dropdown item">
                  {{ Auth::user()->fullname }}
                    <i class="dropdown icon">
                    </i>
                    <div class="menu">
                        <div class="item">
                            <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                            Salir
                        </a>
                        <form action="{{ route('logout') }}" id="logout-form" method="POST" style="display: none;">
                            {{ csrf_field() }}
                        </form>
                        </div>
                    </div>
                </div>
            </div>
            @endif
       
        </div>
    </div>
</div>
