<template>
    <div>
        <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
            </div>
            <ul class="nav navbar-nav">
            <li class="active"><a @click="navigateTo({name: 'home',})">Home</a></li>
            <li><a @click="navigateTo({name: 'topRate',})">Top Rating</a></li>
            <li><a @click="navigateTo({name: 'listNew',})">New Song</a></li>
            </ul>
            <form v-on:submit.prevent="searchSong" class="navbar-form navbar-left">
            <div class="form-group">
                <input type="text" v-model="search" class="form-control" placeholder="Search" name="search">
            </div>
            <button  class="btn btn-default">Submit</button>
            </form>
            <ul class="nav navbar-nav navbar-right">
            <li><a class="btn btn-primary" role="button" @click="navigateTo({name: 'login',})">Login</a></li>
            <li><a @click="navigateTo({name: 'register',})">Register</a></li>
            </ul>
        </div>
        </nav>
    </div>
</template>

<script>

export default {
  name: 'nav-menu',
  data () {
    return {
      search: ''
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
        this.search = value
      } // make value for search data (this.search) when add value at router
    }
  },
  methods: {
    navigateTo (route) {
      console.log(route)
      this.$router.push(route)
    },
    searchSong () {
      // when submit search form , call API search
      console.log(this.$router.query.search)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    body {
    font-family: Arial;
    margin: 0;
    }
</style>
