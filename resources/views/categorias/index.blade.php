@extends('layouts.app')

@section('content')




<div class="ui container" id="categoria" >
  <div class="row">
    <div class="sixteen wide column">
      <h1 class="ui header">Categorias</h1>
    </div>
  </div>
  <div class="row">
    <div class="sixteen wide column" v-on:click='abrirModal();'>
      <div class="ui vertical animated button positive right floated" tabindex="0">
        <div class="hidden content">Nuevo</div>
          <div class="visible content">
            <i class="plus icon"></i>
          </div>
      </div>
    </div>
  </div>
  <br />
  <br>
    <div class="sixteen wide column">
      <div class="ui divider"></div>
    </div>
    <div class="sixteen wide column">
      <table class="ui celled table">
          <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Categoria?</th>
                <th>Subcategoria?</th>
                <th></th>
              </tr>
          </thead>
          <tbody v-for="categoria in categorias">
            <tr>
              <td class="collapsing">
                @{{ categoria.id }}
              </td>
              <td>@{{ categoria.nombre }}</td>
              <td class="collapsing" v-if='categoria.idPadre==0'><i class="check circle icon"></i></td>
              <td class="collapsing" v-else></td>
              <td class="collapsing" v-if='categoria.idPadre!=0'><i class="check circle icon"></i></td>
              <td class="collapsing" v-else></td>
              <td class="collapsing">
                @include('categorias.delete')
                <div class="ui vertical animated orange button" tabindex="0" v-on:click="editCategoria(categoria)">
                  <div class="hidden content">Editar</div>
                  <div class="visible content">
                    <i class="write icon"></i>
                  </div>
                </div>
                <div class="ui vertical animated blue button" tabindex="0" v-on:click="deleteCategoria(categoria)">
                  <div class="hidden content">Eliminar</div>
                  <div class="visible content">
                    <i class="archive icon"></i>
                  </div>
                </div>
                <div class="ui vertical animated red button" tabindex="0" v-on:click="abrirDeleteModal();">
                  <div class="hidden content">Eliminar</div>
                  <div class="visible content">
                    <i class="archive icon"></i>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="5">
                <div class="ui right floated pagination menu" >
                  <a class="icon item" v-on:click.prevent="changePage(pagination.current_page - 1)">
                    <i class="left chevron icon"></i>
                  </a>
                  <div class="" v-for="page in pagesNumber" v-bind:class="[page==isActived ? 'active' : '']">
                      <a class="item" v-on:click.prevent="changePage(page)">@{{ page }}</a>
                  </div>


                  <a class="icon item" @click.prevent="changePage(pagination.current_page + 1)">
                    <i class="right chevron icon"></i>
                  </a>
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
        <div class="">
          <pre>@{{ $data }}</pre>
        </div>
      </div>

  @include('categorias.create')

  </div>
@endsection
