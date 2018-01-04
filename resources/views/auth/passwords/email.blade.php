@extends('layouts.app')

@section('content')
<div class="ui container">
    <div class="ui middle aligned center aligned grid">
        <div class="six wide column">
            <h2 class="ui teal image header">
                <div class="content">
                    Resetear contraseña
                </div>
            </h2>
            <div class="panel-body">
                @if (session('status'))
                <div class="alert alert-success">
                    {{ session('status') }}
                </div>
                @endif
                <form action="{{ route('password.email') }}" class="ui large form" method="POST">
                    {{ csrf_field() }}
                    <div class="ui stacked segment{{ $errors->has('email') ? ' has-error' : '' }}">
                        <div class="field">
                            <input class="form-control" id="email" name="email" placeholder="Escriba su E-mail" required="" type="email" value="{{ old('email') }}">
                                @if ($errors->has('email'))
                                <span class="help-block">
                                    <strong>
                                        {{ $errors->first('email') }}
                                    </strong>
                                </span>
                                @endif
                            </input>
                        </div>
                        <div class="field">
                            <button class="ui fluid large teal submit button" type="submit">
                                enviar al correo
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
