@extends('layouts.app')

@section('content')
<div class="ui container">
    <div class="ui middle aligned center aligned grid">
        <div class="six wide column">
            <h2 class="ui teal image header">
                <div class="content">
                    Regístrate
                </div>
            </h2>
            <form action="{{ route('register') }}" class="ui large form" method="POST">
                {{ csrf_field() }}
                <div class="ui stacked segment">
                    <div class="field{{ $errors->has('fullname') ? ' has-error' : '' }}">
                        <div class="ui left icon input">
                            <i class="user icon">
                            </i>
                            <input autofocus="" id="fullname" name="fullname" placeholder=" nombre Completo" required="" type="name" value="{{ old('fullname') }}">
                                @if ($errors->has('fullname'))
                                <span class="help-block">
                                    <strong>
                                        {{ $errors->first('fullname') }}
                                    </strong>
                                </span>
                                @endif
                            </input>
                        </div>
                    </div>
                    <div class="field{{ $errors->has('email') ? ' has-error' : '' }}">
                        <div class="ui left icon input">
                            <i class="mail icon">
                            </i>
                            <input autofocus="" id="email" name="email" placeholder="E-mail" required="" type="email" value="{{ old('email') }}">
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
                            <input class="form-control" id="password" name="password" placeholder="contraseña" required="" type="password">
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
                        <div class="ui left icon input">
                            <i class="lock icon">
                            </i>
                            <input class="form-control" id="password-confirm" name="password_confirmation" placeholder="repita su contraseña" required="" type="password">
                            </input>
                        </div>
                    </div>
                    <div class="field{{ $errors->has('phone1') ? ' has-error' : '' }}">
                        <div class="ui left icon input">
                            <i class="user icon">
                            </i>
                            <input autofocus="" id="phone1" name="phone1" placeholder="telefono 1" required="" type="name" value="{{ old('phone1') }}">
                                @if ($errors->has('phone1'))
                                <span class="help-block">
                                    <strong>
                                        {{ $errors->first('phone1') }}
                                    </strong>
                                </span>
                                @endif
                            </input>
                        </div>
                    </div>
                    <div class="field{{ $errors->has('phone2') ? ' has-error' : '' }}">
                        <div class="ui left icon input">
                            <i class="user icon">
                            </i>
                            <input autofocus="" id="phone2" name="phone2" placeholder="telefono 2" required="" type="name" value="{{ old('phone2') }}">
                                @if ($errors->has('phone2'))
                                <span class="help-block">
                                    <strong>
                                        {{ $errors->first('phone2') }}
                                    </strong>
                                </span>
                                @endif
                            </input>
                        </div>
                    </div>
                    <button class="ui fluid large teal submit button" type="submit">
                        Registrar
                    </button>
                    <a class="ui fluid facebook button margen-auth" href="{{ env('APP_URL') }}/auth/facebook">
                        <i class="facebook icon ">
                        </i>
                        Regístrate con Facebook
                    </a>
                    {{--
                    <div class="ui fluid large teal submit button" type="submit">
                        Login
                    </div>
                    --}}
                </div>
                <div class="ui error message">
                </div>
            </form>
            <div class="ui message">
                New to us?
                <a href="{{ env('APP_URL') }}/register">
                    Sign Up
                </a>
            </div>
        </div>
    </div>
</div>
@endsection
