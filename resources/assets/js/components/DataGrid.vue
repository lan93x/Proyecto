<template>
    <div>
        <div class="ui equal width left aligned padded grid stackable form">
            <div class="four wide tablet four wide computer column">
                {{title}}
            </div>
            <div class="four wide tablet four wide computer column">
                <div class="ui field">
                    <select class="ui fluid dropdown" v-model="query.search_column">
                        <option :value="column" v-for="column in columns">
                            {{column}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="four wide tablet four wide computer column">
                <div class="ui field">
                    <select class="ui fluid dropdown" v-model="query.search_operator">
                        <option :value="key" v-for="(value, key) in operators">
                            {{value}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="four wide tablet four wide computer column">
                <div class="ui right aligned category search">
                    <div class="ui icon input seeker">
                        <input @keyup.enter="fetchIndexData()" class="prompt" placeholder="Search" type="text" v-model="query.search_input">
                            <i class="search icon">
                            </i>
                            <!--   <button @click="fetchIndexData()" class="ui blue submit button">
                                Filter
                            </button> -->
                        </input>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui container fluid">
            <table class="ui selectable celled table">
                <thead>
                    <tr>
                        <th @click="toggleOrder(column)" v-for="column in columns">
                            <span>
                                {{column}}
                            </span>
                            <span class="dv-table-column" v-if="column === query.column">
                                <span v-if="query.direction === 'desc'">
                                    ↓
                                </span>
                                <span v-else="">
                                    ↑
                                </span>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in model.data">
                        <td v-for="(value, key) in row">
                            {{value}}
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="4">
                            <div class="ui right floated pagination menu ">
                                <a @click="prev()" class="icon item">
                                    <i class="left chevron icon">
                                    </i>
                                </a>
                                <!--     <a class="item" v-for="mostrarPag(model.last_page) in mostrar">
                                    {{mostrar.query.page}}
                                </a> -->
                                <input @keyup.enter="fetchIndexData()" class="input-page" type="text" v-model="query.page"/>
                                <a @click="next()" class="icon item">
                                    <i class="right chevron icon">
                                    </i>
                                </a>
                            </div>
                            <div>
                                <span class="border-page">
                                    {{model.from}} - {{model.to}} de {{model.total}}
                                </span>
                                <span>
                                    filas por pagina:
                                </span>
                                <input @keyup.enter="fetchIndexData()" type="text" v-model="query.per_page" class="input-page">
                                </input>
                            </div>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>
        <!--   <div class="dv-footer">
            <div class="dv-footer-item">
                <span>
                    Displaying {{model.from}} - {{model.to}} of {{model.total}} rows
                </span>
            </div>
            <div class="dv-footer-item">
                <div class="dv-footer-sub">
                    <span>
                        Rows per page
                    </span>
                    <input @keyup.enter="fetchIndexData()" class="dv-footer-input" type="text" v-model="query.per_page">
                    </input>
                </div>
                <div class="dv-footer-sub">
                    <button @click="prev()" class="dv-footer-btn">
                        «
                    </button>
                    <input @keyup.enter="fetchIndexData()" class="dv-footer-input" type="text" v-model="query.page">
                        <button @click="next()" class="dv-footer-btn">
                            »
                        </button>
                    </input>
                </div>
            </div>
        </div> -->
    </div>
</template>
<style>
    .seeker{
        width: 100%;
    }
    .input-page{
      width: 50px;
      text-align: center;
    }
    .border-page {
      padding-right: 10px;
      border-right: 1px solid;
      margin-right: 10px;
    }
</style>
<script>
    import Vue from 'vue'
  import axios from 'axios'
  //similar to vue-resource

  export default {
    props: ['source', 'title', 'ordercolumn', 'searchcolumn'],
    data() {
      return {
        model: {},
        columns: {},
        query: {
          page: 1,
          column: `${this.ordercolumn}`,
          direction: 'asc',
          per_page: 10,
          search_column: `${this.searchcolumn}`,
          search_operator: 'like',
          search_input: ''
        },
        operators: {
          equal: '=',
          not_equal: '<>',
          less_than: '<',
          greater_than: '>',
          less_than_or_equal_to: '<=',
          greater_than_or_equal_to: '>=',
          in: 'IN',
          like: 'LIKE'
        }
      }
    },
    created() {
      this.fetchIndexData()
    },
    methods: {
      next() {
        if(this.model.next_page_url) {
          this.query.page++
          this.fetchIndexData()
        }
      },
      prev() {
        if(this.model.prev_page_url) {
          this.query.page--
          this.fetchIndexData()
        }
      },
      // mostrarPag(totalPag){
        
      //   if (totalPag>1) {
      //     if (totalpag==2) {
      //       for (var i = 0; i >= 2; i++) {
      //         this.query.page = i;
      //       }
      //     }
      //     if (totalpag==3) {
      //       for (var i = 0; i >= 3; i++) {
      //         this.query.page = i;
      //       }
      //     }         
      //   } else {
      //     this.query.page=1;
      //     this.fetchIndexData()
      //   }
      // },
      toggleOrder(column) {
        if(column === this.query.column) {
          // only change direction
          if(this.query.direction === 'desc') {
            this.query.direction = 'asc'
          } else {
            this.query.direction = 'desc'
          }
        } else {
          this.query.column = column
          this.query.direction = 'asc'
        }

        this.fetchIndexData()
      },
      fetchIndexData() {
        var vm = this
        if (this.query.page > this.model.last_page) {
          this.query.page = this.model.last_page;
        }
        axios.get(`${this.source}?column=${this.query.column}&direction=${this.query.direction}&page=${this.query.page}&per_page=${this.query.per_page}&search_column=${this.query.search_column}&search_operator=${this.query.search_operator}&search_input=${this.query.search_input}`)
          .then(function(response) {
            Vue.set(vm.$data, 'model', response.data.model)
            Vue.set(vm.$data, 'columns', response.data.columns)
          })
          .catch(function(response) {
            console.log(response)
          })
      }
    }
  }
</script>