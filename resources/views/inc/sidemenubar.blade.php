<div class="ui vertical menu" id="sidemenu">
<div class="item" v-for='option in options'>
<div class="header">
  <a v-bind:href="'/'+ option.Name +'/B46-C'+ option.id">@{{ option.Name }}</a>
</div>
<div class="menu" v-for='subcategories in option.subcategories'>
<a v-bind:href="'/'+ subcategories.Name +'/B46-S'+ subcategories.id" class="item">@{{ subcategories.Name }}</a>
</div>
</div>
</div>
