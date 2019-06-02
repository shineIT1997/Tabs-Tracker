<template>
    <div>
        <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
            </div>
            <ul class="nav navbar-nav">
            <li class="active"><a @click="navigateTo({name: 'home',}) ">Home</a></li>
            <li><a @click="navigateTo({name: 'home', query : {action : 'TopRate'}})">Top Rating</a></li>
            <li><a @click="navigateTo({name: 'home', query : {action : 'NewSong'}})">New Song</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
            <li v-if="loginCheck"><a class="btn btn-primary" role="button" @click="navigateTo({name: 'profileUser',})">Profile</a></li>
            <li v-if="loginCheck" ><a @click="navigateTo({name: 'profileUser', query : {component : 'comment'}})" class="btn noty"><span class="glyphicon glyphicon-bell ">
              <span class="notytext">{{(notiComment.length)?notiComment.length:0}} comment is waiting to approved</span>
              </span></a></li>
            <li v-if="loginCheck"><a role="button" @click="logout">Logout</a></li>
            <li v-if="!loginCheck"><a class="btn btn-primary" role="button" @click="navigateTo({name: 'login',})">Login</a></li>
            <li v-if="!loginCheck"><a @click="navigateTo({name: 'register',})">Register</a></li>
            </ul>
        </div>
        </nav>
    </div>
</template>

<script>
import { Store } from 'vuex';
import List from './list'
import Search from '../song/searchSong'
export default {
  name: 'nav-menu',
  components: {
    Search,
    List
  },
  computed: {
    loginCheck () {
      return this.$store.users.getters.getDataUser.token
    },
    notiComment () {
      let countNoty =this.$store.users.getters.getDataUser.comments 
      if(countNoty > 0) {
        $(".notytext").css({ visibility: 'visible' , background: '#5bc0de'})
        $(".noty").addClass('btn-info')
        return countNoty
      }
      else return 0
    },
    listSong () {
      return this.$store.songs.getters.getDataSong
    },
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
  async mounted() {
    this.$store.songs.dispatch('getNewSong')
    this.$store.users.dispatch('getComments' , {
      userID: localStorage.token
    })
    if(this.notiComment) {
      console.log(this.notiComment);
    }
    this.$forceUpdate()
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.users.dispatch('logout')
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
.noty {
  position: relative;
  display: inline-block;
}

.noty .notytext {
  visibility: hidden;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 252%;
  right: 0%;
  margin-right: -50%;
}
.noty:hover .notytext {
  visibility: visible;
}

</style>
