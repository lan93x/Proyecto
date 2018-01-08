@extends('layouts.app')

@section('content')
<div class="ui grid" id="detAnnounce">
  {{-- <pre>@{{ $data }}</pre> --}}
<div class="sixteen wide column"  v-for="announce in detannounce">
  <div class="ui grid">
  <div class="sixteen wide column">

    <h3 class="ui block header">
      @{{ announce.year }} @{{ announce.brand }} @{{ announce.carmodel }} @{{ announce.subcategory }}
    </h3>

  </div>
  <div class="eight wide column">
<img class="ui fluid rounded image"
:src="announce.image">
  </div>
  <div class="eight wide column">


<h4 class="ui horizontal divider header">
  <i class="bar chart icon"></i>
  Detalles
</h4>
<h2 class="ui header">
  $us. @{{ announce.price }}
  {{-- <div class="ui yellow vertical animated button right floated" tabindex="0">
  <div class="hidden content"></div>
  <div class="visible content">
    <i class="star icon"></i>
  </div>
</div> --}}
  <button class="ui yellow basic button right floated"><i class="star icon"></i>Agregar a Favoritos </button>
</h2>
<br>
    <div class="ui grid">
      <div class="eight wide column">

        <div class="ui link card">
          <div class="content">
            <div class="header">@{{ announce.brand }}</div>
            <div class="meta">
              <span class="category">@{{ announce.carmodel }}</span>
            </div>
            <div class="description">
              <table class="ui definition table">
  <tbody>
    <tr>
      <td>Condicion</td>
      <td>@{{ announce.condition }}</td>
    </tr>
    <tr>
      <td class="two wide column"></i>@{{ announce.lengthunit }} recorridos</td>
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
              {{-- <p><i class="theme icon"></i><b>Color : Gasolina</b></p>
              <p><i class="theme icon"></i><b>Combustible : Gasolina</b></p>
              <p><i class="theme icon"></i><b>Combustible : Gasolina</b></p>
              <p><i class="theme icon"></i><b>Combustible : Gasolina</b></p>
              <p><i class="theme icon"></i><b>Combustible : Gasolina</b></p>
              <p>Combustible : Gasolina</p>
              <p>Combustible : Gasolina</p> --}}
            </div>
          </div>
          {{-- <div class="extra content">
            <div class="right floated author">
              <button class="ui yellow basic button"><i class="star icon"></i>Agregar a </button>
            </div>
          </div> --}}
        </div>
      </div>
      <div class="eight wide column">
        <div class="ui link card">
          <div class="content">
            <div class="header"> <i class="text telephone icon"> </i>@{{ announce.phone1 }}</div>
            <div class="meta">
              <span class="category">@{{ announce.email }}</span>
            </div>
            <div class="description">
              <p></p>
            </div>
          </div>
          <div class="extra content">
            <div class="right floated author">
              <img class="ui avatar image" :src="announce.avatar"> @{{ announce.fullname }}
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="ui mini horizontal statistic">
    <div class="value">
      @{{ announce.visits }}
    </div>
    <div class="label">
      Visitas
    </div>
  </div>
  <button class="ui circular facebook icon button right floated">
  <i class="facebook icon"></i>
  </button>
</div>
<div class="sixteen wide column">
  <h4 class="ui horizontal divider header">
  <i class="tag icon"></i>
  Descripcion
</h4>
<p>@{{ announce.description }}</p>
</div>
<div class="sixteen wide column">
  <div class="ui comments" style="max-width: 100%">
    <h4 class="ui horizontal divider header">
  <i class="comments icon"></i>
  Comentarios
</h4>
<h3>@{{ mensaje }}</h3>
    <div class="comment" v-for='comment in comments'>
      <a class="avatar">
        <img :src="comment.users.avatar">
      </a>
      <div class="content">
        <a class="author">@{{ comment.users.fullname}}</a>
        <div class="metadata">
          <span class="date">Today at 5:42PM</span>
        </div>
        <div class="text">
          @{{ comment.text}}
        </div>
        <div class="actions">
          <a class="reply">Responder</a>
        </div>
      </div>
      <div class="comments" v-for="replie in comment.replies_whit_user">
        <div class="comment">
          <a class="avatar">
            <img :src="replie.users.avatar">
          </a>
          <div class="content">
            <a class="author">@{{ replie.users.fullname }}</a>
            <div class="metadata">
              <span class="date">Just now</span>
            </div>
            <div class="text">
              @{{ replie.text}}
            </div>
            {{-- <div class="actions">
              <a class="reply">Responder</a>
            </div> --}}
          </div>
        </div>
      </div>
    </div>
    @if(Route::has('login'))
      @auth
        <form class="ui reply form">
          <div class="field">
            <textarea></textarea>
          </div>
          <div class="ui blue labeled submit icon button">
            <i class="icon edit"></i> Enviar Comentario
          </div>
        </form>
      @else
        <h3>Debes iniciar sesion para poder comentar</h3>
      @endauth
    @endif
  </div>
</div>
</div>

</div>


</div>
@endsection
