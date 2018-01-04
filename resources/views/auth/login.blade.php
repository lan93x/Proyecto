@extends('layouts.app')

@section('content')

<div class="ui container">
    <div class="ui middle aligned center aligned grid">
        <div class="six wide column">
            <h2 class="ui teal image header">
                <div class="content">
                    Ingrese
                </div>
            </h2>
            <form role="form" action="{{ route('login') }}" class="ui large form" method="POST">
                 {{ csrf_field() }}
                <div class="ui stacked segment">
                    <div class="field{{ $errors->has('email') ? ' has-error' : '' }}">
                        <div class="ui left icon input">
                            <i class="user icon">
                            </i>
                            <input autofocus="" id="email" name="email" required="" type="email" value="{{ old('email') }}">
                                @if ($errors->has('email'))
                                <span class="help-block">
                                    <strong>
                                        {{ $errors->first('email') }}
                                    </strong>
                                </span>
                                @endif
                            </input>
                        </div>
                     </div>
                    <div class="field{{ $errors->has('password') ? ' has-error' : '' }}">
                        <div class="ui left icon input">
                            <i class="lock icon">
                            </i>
                            <input class="form-control" id="password" name="password" required="" type="password">
                                @if ($errors->has('password'))
                                <span class="help-block">
                                    <strong>
                                        {{ $errors->first('password') }}
                                    </strong>
                                </span>
                                @endif
                            </input>
                        </div>
                    </div>
                    <div class="field">
                          <label>
                                <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Recordarme
                            </label>
                    </div>
                    <button class="ui fluid large teal submit button" type="submit">
                        Entrar
                    </button>
                     <a class="ui fluid facebook button margen-auth" href="{{ env('APP_URL') }}/auth/facebook" >
                        <i class="facebook icon ">
                        </i>
                        Ingresar con Facebook
                    </a>
                </div>
                <div class="ui error message">
                </div>
            </form>
            <div class="ui message">
             
                <a class="" href="{{ route('password.request') }}">
                    Olvidaste tu contraseña?
                </a>
            </div>
        </div>
    </div>
</div>
@endsection
