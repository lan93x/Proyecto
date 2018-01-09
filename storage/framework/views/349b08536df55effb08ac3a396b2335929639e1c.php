
<div class="ui modal 1">
  <div class="header">Nueva Categoria</div>
  <div class="content">
    <form class="ui form" v-on:submit.prevent="storeCategoria();" method="post">
      <div class="grouped fields">
      <label>Tipo :</label>
      <div class="field">
        <div class="ui radio checkbox">
          <input type="radio" name="example2" checked="checked" id="100" v-model="rdatipo" value="Categoria">
          <label for="100">Categoria</label>
        </div>
      </div>
      <div class="field">
        <div class="ui radio checkbox">
          <input type="radio" name="example2" id="101" v-model="rdatipo" value="Subcategoria">
          <label for="101">Subcategoria</label>
        </div>
      </div>
    </div>
  <div class="field">
    <label>Nombre</label>
    <input name="first-name" placeholder="" type="text" v-model='txtnombre'>
  </div>
  <div v-if="rdatipo=='Subcategoria'" class="field" >
    <label>Padre</label>
    <select class="ui fluid dropdown" name="" v-model='cbxcategoriapadre' >
        <option  v-for="categoria in categorias" v-if="categoria.idPadre==0" :value='categoria.id' >{{ categoria.nombre }}</option>
    </select>

  </div>
  <button class="ui button positive" type="submit">Guardar</button>
</form>
  </div>
</div>
