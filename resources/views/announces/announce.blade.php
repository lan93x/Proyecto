@extends('layouts.app')

@section('content')

    <div class="sixteen wide column" id="announce">

      <div class="ui fluid icon input">
  <input placeholder="Search a very wide input..." type="text">
  <i class="search icon"></i>
</div>

  <div class="ui items" v-if="announces!=0">
    <div class="item" v-for="anuncio in announces">

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

{{-- //  <pre> @{{ $data }}</pre> --}}
  </div>


<div v-else>
  <br>
  <br>
  <h2 class="ui center aligned icon header">
  <i class="warning sign icon"></i>
  No existen anuncios para esta Categoria/Subcategoria
  <br>
  <br>
  <button class="ui primary button">
  Anuncia Ya!
</button>
</h2>
</div>

    </div>

</div>
  @endsection
