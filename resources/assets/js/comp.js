window.Vue = require('vue');
Vue.component('grid', require('./components/DataGrid.vue'));
const app = new Vue({
    el: '#app'
});