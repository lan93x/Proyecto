$(document).ready(function() {
  $('.menu .item')
    .tab();
});

new Vue({
  el: '#sidemenu',
  created: function() {
    this.getSideMenu();
  },
  data: {
    options: [],
    valor: 'asd',
  },
  methods: {
    getSideMenu: function() {
      var urlSideMenu = '/getSideMenu';
      axios.get(urlSideMenu).then(response => {
        this.options = response.data
      });
    },
    getAnnouncesByCategory: function(id) {
      var urlSideMenu = '/getSideMenu';
      window.location.href = 'your_url';
    }
  }
});
new Vue({
  el: '#index',
  created: function() {
    this.getAnuncios();
  },
  data: {
    announces: [],
    pagination: {
      'total': 0,
      'current_page': 0,
      'per_page': 0,
      'last_page': 0,
      'from': 0,
      'to': 0,
    },
  },
  computed: {
    isActived: function() {
      return this.pagination.current_page;
    },
    pagesNumber: function() {
      if (!this.pagination.to) {
        return [];
      }
      var from = this.pagination.current_page - 2;
      if (from < 1) {
        from = 1;
      }
      var to = from + (2 * 2);
      if (to >= this.pagination.last_page) {
        to = this.pagination.last_page
      }

      var pagesArray = [];
      while (from <= to) {
        pagesArray.push(from);
        from++
      }
      return pagesArray;
    }
  },
  methods: {
    getAnuncios: function(page) {
      var urlAnuncios = '/getLastAnnounces';
      axios.get(urlAnuncios).then(response => {
        this.announces = response.data
        //this.pagination = response.data.pagination
      });

    },
    changePage: function(page) {
      this.pagination.current_page = page;
      this.getCategorias(page);
    }
    // getAnnouncesByCategory: function() {
    //   axios.get('/Vehiculo', {
    //       params: {
    //         id: ''
    //       }
    //     })
    //     .then(function(response) {
    //       this.anuncios = response.data.anuncios.data,
    //         this.pagination = response.data.pagination
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // }
  }

});
new Vue({
  el: '#announce',
  created: function() {
    this.getAnnouncesByCatorSub();
  },
  data: {
    announces: [],
    pagination: {
      'total': 0,
      'current_page': 0,
      'per_page': 0,
      'last_page': 0,
      'from': 0,
      'to': 0,
    },
  },
  computed: {
    isActived: function() {
      return this.pagination.current_page;
    },
    pagesNumber: function() {
      if (!this.pagination.to) {
        return [];
      }
      var from = this.pagination.current_page - 2;
      if (from < 1) {
        from = 1;
      }
      var to = from + (2 * 2);
      if (to >= this.pagination.last_page) {
        to = this.pagination.last_page
      }

      var pagesArray = [];
      while (from <= to) {
        pagesArray.push(from);
        from++
      }
      return pagesArray;
    }
  },
  methods: {
    getAnnouncesByCatorSub: function() {
      var location = window.location.href;
      var n = location.search("-");
      var id = location.slice(n + 2);
      var cat = location.slice(n + 1);
      var cat1 = cat.slice(0, 1);
      var urlAnnounce = '';
      if (cat1 == 'S') {
        urlAnnounce = '/getAnnouncesBySubcategory/' + id;
      } else {
        urlAnnounce = '/getAnnouncesByCategory/' + id;
      }
      axios.get(urlAnnounce).then(response => {
          this.announces = response.data.anuncios.data,
            this.pagination = response.data.pagination
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

});
new Vue({
  el: '#detAnnounce',
  created: function() {
    this.getDetailAnnounce();
  },
  data: {
    detannounce: [],
    // images: [],
    comments: [],
  },
  methods: {
    getDetailAnnounce: function() {
      var location = window.location.href;
      var n = location.search("@");
      var id = location.slice(n + 1);
      urlAnnounce = '/getDetailAnnounce/' + id;
      axios.get(urlAnnounce).then(response => {
          this.detannounce = response.data.anuncio
          this.comments = response.data.comentarios
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
});
// new Vue({
//   el: '#categoria',
//   created: function() {
//     this.getCategorias(1);
//   },
//   data: {
//     edit: 0,
//     categorias: [],
//     txtnombre: '',
//     cbxcategoriapadre: '',
//     rdatipo: '',
//     fillCategoria: {
//       id: '',
//       nombre: '',
//       idPadre: '',
//     },
//     pagination: {
//       'total': 0,
//       'current_page': 0,
//       'per_page': 0,
//       'last_page': 0,
//       'from': 0,
//       'to': 0,
//     },
//   },
//   computed: {
//     isActived: function() {
//       return this.pagination.current_page;
//     },
//     pagesNumber: function() {
//       if (!this.pagination.to) {
//         return [];
//       }
//       var from = this.pagination.current_page - 2;
//       if (from < 1) {
//         from = 1;
//       }
//       var to = from + (2 * 2);
//       if (to >= this.pagination.last_page) {
//         to = this.pagination.last_page
//       }
//
//       var pagesArray = [];
//       while (from <= to) {
//         pagesArray.push(from);
//         from++
//       }
//       return pagesArray;
//     }
//   },
//   methods: {
//     getCategorias: function(page) {
//       var urlCategorias = 'categorias?page=' + page;
//
//       axios.get(urlCategorias).then(response => {
//         console.log(response);
//         // this.categorias = response.data,
//         // this.pagination = response.data.pagination
//       });
//
//     },
//     storeCategoria: function() {
//       var url = 'categorias';
//       idpadre = 0;
//       debugger;
//       if (this.rdatipo == "Subcategoria") {
//         idpadre = this.cbxcategoriapadre;
//       } else {
//         idpadre: 0;
//       };
//       axios.post(url, {
//         nombre: this.txtnombre,
//         idPadre: idpadre,
//
//       }).then(response => {
//         $('.ui.modal')
//           .modal('hide');
//         this.getCategorias();
//         this.txtnombre = '';
//         this.rdatipo = this.rdatipo,
//           toastr.success('Nueva categoria creada correctamente');
//       });
//     },
//     abrirModal: function() {
//       this.edit = 0;
//       $('.ui.modal')
//         .modal('show');
//     },
//     abrirDeleteModal: function() {
//       $('.ui.basic.modal')
//         .modal('show');
//     },
//     deleteCategoria: function(categoria) {
//       var url = 'categorias/' + categoria.id;
//       axios.delete(url).then(response => {
//         $('.ui.basic.modal')
//           .modal('hide');
//         this.getCategorias();
//         toastr.warning('Categoria eliminada de manera exitosa');
//
//       });
//     },
//     editCategoria: function(categoria) {
//       this.edit = 1;
//       this.fillCategoria.id = categoria.id;
//       this.fillCategoria.nombre = categoria.nombre;
//       this.fillCategoria.idPadre = categoria.idPadre;
//       $('.ui.modal')
//         .modal('show');
//     },
//     updateCategoria: function(id) {
//       var url = 'categorias/' + id;
//       axios.put(url, this.fillCategoria).then(response => {
//         this.getCategorias();
//         this.fillServicio = {
//           id: '',
//           nombre: '',
//           idPadre: '',
//         };
//         $('.ui.modal')
//           .modal('hide');
//       });
//     },
//     changePage: function(page) {
//       this.pagination.current_page = page;
//       this.getCategorias(page);
//       window.history.forward()
//     }
//   }
// });