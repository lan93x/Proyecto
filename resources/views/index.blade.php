@extends('layouts.app')

@section('content')

    <div class="sixteen wide column" id="index">
      <div class="ui fluid icon input">
  <input placeholder="Search a very wide input..." type="text">
  <i class="search icon"></i>
</div>
<h4 class="ui horizontal divider header">
  <i class="tag icon"></i>
  Ultimos Anuncios(limitado a 5)
</h4>
    <div class="ui items">
      <div class="item" v-for="anuncio in anuncios" >
        <div class="ui small image">
          <img :src="anuncio.image">
        </div>
        <div class="content">
          <div class="header">@{{ anuncio.year }} @{{ anuncio.brand }} @{{ anuncio.carmodel }} @{{ anuncio.subcategory }}
          </div>
          <div class="meta">
            <span class="price">$us @{{ anuncio.price }}</span>
            <span class="stay">@{{ anuncio.color }}</span>
          </div>
          <div class="description">
            <p>@{{ anuncio.color }}</p>
          </div>
        </div>
      </div>
      <div class="divider">

      </div>

</div>
    </div>


  @endsection
