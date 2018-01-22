@extends('layouts.app')

@section('content')
<div id="detAnnounce">
    <div class="ui equal width left aligned padded grid stackable" v-for="announce in detannounce">
        <div class="row">
            <div class="sixteen wide computer column">
                <h3 class="ui block header">
                    @{{ announce.year }} @{{ announce.brand }} @{{ announce.carmodel }} @{{ announce.subcategory }}
                </h3>
            </div>
        </div>
        <div class="sexteen wide tablet nine wide computer column">
            <div class="row">
                <img :src="announce.image" class="ui fluid rounded image">
                </img>
            </div>
            <div class="ui grid row">
                <div class="four wide tablet four wide computer column">
                    <img :src="announce.image" class="ui fluid rounded image" width="100px">
                    </img>
                </div>
                <div class="four wide tablet four wide computer column">
                    <img :src="announce.image" class="ui fluid rounded image" width="100px">
                    </img>
                </div>
                <div class="four wide tablet four wide computer column">
                    <img :src="announce.image" class="ui fluid rounded image" width="100px">
                    </img>
                </div>
                <div class="four wide tablet four wide computer column">
                    <img :src="announce.image" class="ui fluid rounded image" width="100px">
                    </img>
                </div>
            </div>
        </div>
        <div class="sexteen wide tablet seven wide computer column">
            <div class="ui horizontal divider ">
                <span>
                    <i class="bar chart icon">
                    </i>
                    Detalles
                </span>
            </div>
            <div class="ui equal width left aligned padded grid stackable ">
                <div class="row">
                    <div class="eight wide computer column center-price">
                        <h2>
                            $us. @{{ announce.price }}
                        </h2>
                    </div>
                    <div class="eight wide computer column">
                        <button class="ui yellow basic button right floated size-button">
                            <i class="star icon">
                            </i>
                            Agregar a Favoritos
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="sixteen wide tablet eight wide computer column">
                        <div class="ui link card">
                            <div class="content">
                                <div class="header">
                                    @{{ announce.brand }}
                                </div>
                                <div class="meta">
                                    <span class="category">
                                        @{{ announce.carmodel }}
                                    </span>
                                </div>
                                <div class="description ">
                                    {{-- aqui poner la tabla --}}
                                    <table class="ui definition table">
                                      <tbody>
                                        <tr>
                                          <td>Condicion</td>
                                          <td>@{{ announce.condition }}</td>
                                        </tr>
                                        <tr>
                                          <td></i>@{{ announce.lengthunit }} recorridos</td>
                                          <td>@{{ announce.milleage }}</td>
                                        </tr>
                                        <tr>
                                          <td>Color</td>
                                          <td>@{{ announce.color }}</td>
                                        </tr>
                                        <tr>
                                          <td>Transmission</td>
                                          <td>@{{ announce.transmission }}</td>
                                        </tr>
                                        <tr>
                                          <td>Combustible</td>
                                          <td>@{{ announce.fuel }}</td>
                                        </tr>
                                        <tr>
                                          <td>Documentacion</td>
                                          <td>@{{ announce.documentation }}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=" sixteen wide tablet eight wide computer column ">
                        <div class=" column">
                            <div class="ui link card">
                                <div class="content">
                                    <div class="header">
                                        <i class="text telephone icon">
                                        </i>
                                        @{{ announce.phone1 }}
                                    </div>
                                    <div class="meta">
                                        <span class="category">
                                            @{{ announce.email }}
                                        </span>
                                    </div>
                                    <div class="description">
                                        <p>
                                        </p>
                                    </div>
                                </div>
                                <div class="extra content">
                                    <div class="right floated author">
                                        <img :src="announce.avatar" class="ui avatar image">
                                            @{{ announce.fullname }}
                                        </img>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ui horizontal divider ">
                            <span>
                                <i class="share alternate icon">
                                </i>
                                Compartir
                            </span>
                        </div>
                        <div class="ui grid column">
                            <div class="eight wide column">
                                <button class="ui facebook button">
                                    <i class="facebook icon">
                                    </i>
                                    Facebook
                                </button>
                            </div>
                            <div class="eight wide column">
                                <button class="ui google plus button">
                                    <i class="google plus icon">
                                    </i>
                                    Google
                                </button>
                            </div>
                            <div class="eight wide column">
                                <button class="ui instagram button">
                                    <i class="instagram icon">
                                    </i>
                                    Instagram
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {{--
                <div class="sixteen wide computer column font-size-table">
                </div>
                --}}
            </div>
        </div>
        <div class="ui horizontal divider header">
            <span>
                <i class="tag icon">
                </i>
                Descripcion
            </span>
        </div>
        <div class="sixteen wide column">
            <div class="ui container">
                <p>
                    @{{ announce.description }}
                </p>
            </div>
        </div>
        <div class="ui horizontal divider header">
            <span>
                <i class="comments icon">
                </i>
                Comentarios
            </span>
        </div>
        <div class="sixteen wide column">
            <div class="ui container">
                <p>
                    @{{ mensaje }}
                </p>
                <div class="comment" v-for="comment in comments">
                    <a class="avatar">
                        <img :src="comment.users.avatar">
                        </img>
                    </a>
                    <div class="content">
                        <a class="author">
                            @{{ comment.users.fullname}}
                        </a>
                        <div class="metadata">
                            <span class="date">
                                Today at 5:42PM
                            </span>
                        </div>
                        <div class="text">
                            @{{ comment.text}}
                        </div>
                        <div class="actions">
                            <a class="reply">
                                Responder
                            </a>
                        </div>
                    </div>
                    <div class="comments" v-for="replie in comment.replies_whit_user">
                        <div class="comment">
                            <a class="avatar">
                                <img :src="replie.users.avatar">
                                </img>
                            </a>
                            <div class="content">
                                <a class="author">
                                    @{{ replie.users.fullname }}
                                </a>
                                <div class="metadata">
                                    <span class="date">
                                        Just now
                                    </span>
                                </div>
                                <div class="text">
                                    @{{ replie.text}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @if(Route::has('login'))
        @auth
        <div class="ui container">
            <form class="ui reply form ">
                <div class="field">
                    <textarea>
                    </textarea>
                </div>
                <div class="ui blue labeled submit icon button">
                    <i class="icon edit">
                    </i>
                    Enviar Comentario
                </div>
            </form>
        </div>
        @else
        <div class="ui container">
            <h3>
                Debes iniciar sesion para poder comentar
            </h3>
        </div>
        @endauth
        @endif
      
        {{-- aqui termina v-for de announce --}}
    </div>
</div>
@endsection
