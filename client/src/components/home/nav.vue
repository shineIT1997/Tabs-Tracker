<template>
    <div>
        <nav id="nav" class="navbar ">
        <div class="container">
          <div class="navbar-brand">
						<a @click="navigateTo({name: 'home',})" >
							<img class="logo-alt" src="../../assets/image/guitar.png" alt="logo">
						</a>
					</div>
          <ul class="main-nav nav navbar-nav navbar-right">
            <li class="active"><a @click="navigateTo({name: 'home',}) ">Home</a></li>
            <li><a @click="navigateTo({name: 'songs', query : {action : 'TopRate'}})">Top Rating</a></li>
            <li><a @click="navigateTo({name: 'songs', query : {action : 'NewSong'}})">New Song</a></li>
            

            <li v-if="loginCheck.token"><a class="btn btn btn-primary" @click="navigateTo({name: 'profileUser',})">{{loginCheck.userLogin.userName}}</a></li>
            <li v-if="loginCheck.token" ><a @click="navigateTo({name: 'profileUser', query : {component : 'comment'}})" class="btn noty"><span class="glyphicon glyphicon-bell ">
              <span class="notytext">{{(notiComment.length)?notiComment.length:0}} comment is waiting to approved</span>
              </span></a></li>
            <li v-if="loginCheck.token"><a role="button" @click="logout">Log Out</a></li>
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
      let a = this.$store.users.getters.getDataUser
      return a
    },
    notiComment () {
      let countNoty = this.$store.users.getters.getDataUser.comments 
      if(countNoty.length > 0) {
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
  color: white;
}
.noty {
  position: relative;
  display: inline-block;
}
.light {
  height: 40px;
  width: 40px;
}
.container {
  max-width: 1200px;
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
#nav.navbar {
    border: none;
    border-radius: 0;
    margin-bottom: 0px;
}
.user {
  border-left: double 2px black;
}
#nav {
  -webkit-transition: 0.2s padding;
  transition: 0.2s padding;
  z-index: 999;
  color: #fff;
}
.navbar {
  position: relative;
  min-height: 50px;
  margin-bottom: 20px;
  border: 1px solid transparent;
}
.container {
  padding: 0px 15px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}
.btn:hover {
 color: black
}
.logo-alt {
  width: 50px;
  height: 50px;
}
.navbar-brand {
  padding: 0px;
}
.navbar-center {
  display: inline-block;
  float: none;
  vertical-align: top;
  text-align: center;
}
</style>
