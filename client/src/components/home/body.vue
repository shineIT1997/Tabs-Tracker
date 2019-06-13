<template>
    <div>
        <div class="row bg-img">
          <div class="search">
            <form v-on:submit.prevent="searchSong" class="navbar-form navbar-left">
            <div class="form-group">
                <input type="text" v-model="search" class="form-control" placeholder="Search" name="search">
            </div>
            <button  class="btn btn-default">Search</button>
            </form>
          </div>
        </div>
        <component v-bind:is="component" v-bind:result="result" v-bind:title="search"></component>
    </div>
</template>

<script>
import { Store } from 'vuex';
import List from './list'
import Search from '../song/searchSong'
export default {
  name: 'body-content',

  components: {
    Search,
    List,
  },
  computed: {
    result () {
      this.resultSearch =  this.$store.songs.getters.getDataSong.searchList
        for(let key in this.resultSearch) {
          if(this.resultSearch[key].userID == localStorage.token) {
          this.resultSearch[key]['checkUser'] =  true
          }
          else {
            this.resultSearch[key]['checkUser'] =  false
          }
        }
        return this.resultSearch
      }
  },
  data () {
    return {
      search: '',
      component: List,
      resultSearch: '',
    }
  },
  watch: {
    search (value) {
      const route = this.$router // get router (tham chiếu đến search trong data)
      if (this.search !== '') {
        route.query = {
          search: this.search
        } // parse search info in params search in router
      }
      this.$router.push(route)
    },
    '$route.query.search': {
      immediate: true,
      handler (value) {
        if(value) {
          this.search = value
        }
      } // make value for search data (this.search) when add value at router
    }
  },
  methods: {
    searchSong () {
      let key = this.$router.query.search
       this.$store.songs.dispatch('findSong' , key)
      this.component = Search
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    body {
    font-family: Arial;
    margin: 0;
    }
    .row { 
      height: 100px;
      margin: auto;
    }
    .search {
      left: 50%;
      top: 50%;
      position: relative;
      -webkit-transform: translate(-50% , -50%);
      transform: translate(-50% , -50%);
      width: 800px;
    }
    .search form {
      width: 800px;
    }
    .search form input{
      width: 650px;
      height: 40px;
      border-radius: 20px;
    }
    .bg-img {
      background-image: url(../../assets/image/5oPj8Sy.jpg);
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      background-position: center;
      background-size: cover;
      background-attachment: fixed;
    }
</style>
