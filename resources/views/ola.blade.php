@extends('layouts.app')

@section('content')
<div class="ui container">
    <div class="ui middle aligned center aligned grid">
        {{--
        <div class="panel-heading">
            Resetear Contraseña
        </div>
        --}}
        <div class="six wide column">
            <h2 class="ui teal image header">
                <div class="content">
                    Log-in to your account
                </div>
            </h2>
            <form action="{{ route('password.request') }}" class="ui large form" method="POST">
                {{ csrf_field() }}
                <input name="token" type="hidden" value="{{ $token }}">
                    <div class="ui stacked segment{{ expression }}">
                        <div class="field">
                            <input autofocus="" id="email" name="email" placeholder="E-mail" required="" type="email" value="{{ $email or old('email') }}">
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
                        <input id="password" name="password" required="" type="password">
                            @if ($errors->has('password'))
                            <span class="help-block">
                                <strong>
                                    {{ $errors->first('password') }}
                                </strong>
                            </span>
                            @endif
                        </input>
                    </div>
                    <div class="field{{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
                        <input id="password-confirm" name="password_confirmation" required="" type="password">
                            @if ($errors->has('password_confirmation'))
                            <span class="help-block">
                                <strong>
                                    {{ $errors->first('password_confirmation') }}
                                </strong>
                            </span>
                            @endif
                        </input>
                    </div>
                    <div class="fui stacked segment">
                        <div class="field">
                            <button class="ui fluid large teal submit button" type="submit">
                                Resetear Contraseña
                            </button>
                        </div>
                    </div>
                </input>
            </form>
        </div>
    </div>
</div>
@endsection
