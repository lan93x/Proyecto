new Vue({
    el: '#formulario',
    created: function() {
        $('.ui.radio.checkbox').checkbox();
    },
    data: {},
    methods: {}
});
new Vue({
    el: '#categoria',
    created: function() {
        this.getCategorias();
    },
    data: {
        edit: 0,
        categorias: [],
        txtnombre: '',
        cbxcategoriapadre: '',
        rdatipo: '',
        fillCategoria: {
            id: '',
            nombre: '',
            idPadre: '',
        },
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
        getCategorias: function(page) {
            var urlCategorias = 'categorias/getCategorias?page=' + page;
            axios.get(urlCategorias).then(response => {
                this.categorias = response.data.categorias.data,
                    this.pagination = response.data.pagination
            });
        },
        storeCategoria: function() {
            var url = 'categorias';
            idpadre = 0;
            debugger;
            if (this.rdatipo == "Subcategoria") {
                idpadre = this.cbxcategoriapadre;
            } else {
                idpadre: 0;
            };
            axios.post(url, {
                nombre: this.txtnombre,
                idPadre: idpadre,
            }).then(response => {
                $('.ui.modal').modal('hide');
                this.getCategorias();
                this.txtnombre = '';
                this.rdatipo = this.rdatipo,
                    toastr.success('Nueva categoria creada correctamente');
            });
        },
        abrirModal: function() {
            this.edit = 0;
            $('.ui.modal').modal('show');
        },
        abrirDeleteModal: function() {
            $('.ui.basic.modal').modal('show');
        },
        deleteCategoria: function(categoria) {
            var url = 'categorias/' + categoria.id;
            axios.delete(url).then(response => {
                $('.ui.basic.modal').modal('hide');
                this.getCategorias();
                toastr.warning('Categoria eliminada de manera exitosa');
            });
        },
        editCategoria: function(categoria) {
            this.edit = 1;
            this.fillCategoria.id = categoria.id;
            this.fillCategoria.nombre = categoria.nombre;
            this.fillCategoria.idPadre = categoria.idPadre;
            $('.ui.modal').modal('show');
        },
        updateCategoria: function(id) {
            var url = 'categorias/' + id;
            axios.put(url, this.fillCategoria).then(response => {
                this.getCategorias();
                this.fillServicio = {
                    id: '',
                    nombre: '',
                    idPadre: '',
                };
                $('.ui.modal').modal('hide');
            });
        },
        changePage: function(page) {
            this.pagination.current_page = page;
            this.getCategorias(page);
        }
    }
});