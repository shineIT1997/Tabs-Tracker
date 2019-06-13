<template>
    <div>
        <div class="header">
          <div class="bg-img" >
            <div class="overlay"></div>
          </div>
          <navCus></navCus>
            <div class="home-wrapper">
            <div class="container">
              <div class="row">

                <!-- home content -->
                <div class="col-md-10 col-md-offset-1">
                  <div class="home-content">
                    <a @click="navigateTo({name: 'home',})"><h1  class="white-text">Tabs-Tracker</h1></a>
                    <p class="black-text"> Let's Share the Song you love
                    </p>
                    <v-btn v-if="loginCheck" fab @click="navigateTo({name: 'createSong',})" color="light blue">
                      <v-icon>add</v-icon>
                    </v-btn>

                    <button v-if="!loginCheck" @click="navigateTo({name: 'login',})" class="main-btn">Sign In</button>
                    <button v-if="!loginCheck" @click="navigateTo({name: 'register',})" class="white-btn">Sign Up</button>
                  </div>
                </div>
                <!-- /home content -->
              </div>
            </div>
          </div>
        </div>
        
    </div>
</template>
<script>
import navCus from './nav'
export default {
  name: 'header-tabs',
  components: {
    navCus
  },
  computed: {
    loginCheck () {
      return this.$store.users.getters.getDataUser.token
    },
  },
  methods: {
    async navigateTo (route) {
      console.log(route)
      await this.$router.push(route)
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
    .bg-img {
      background-image: url(../../assets/image/5oPj8Sy.jpg);
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      background-position: center;
      background-size: cover;
      background-attachment: fixed;
    }
    /* Header/Logo Title */
    .header {
      height: 40vh;
      position: relative;
          background-image: linear-gradient(to bottom, rgba(103, 198, 232, 0.8), rgba(213, 218, 219, 0));
    }
    a:hover {
      text-decoration: none;
    }
    .main-btn, .white-btn, .outline-btn {
      display: inline-block;
      padding: 10px 35px;
      margin: 3px;
      border: 2px solid transparent;
      border-radius: 3px;
      -webkit-transition: 0.2s opacity;
      transition: 0.2s opacity;
      background: #6195FF;
      color: #FFF;
    }
    .container {
      width: 1200px;
    }
    .white-btn {
      background: #FFF;
      color: #10161A !important;
    }
    .home-content h1 {
      text-transform: uppercase;
      color: #0277BD
    }
    .black-text {
      color: black
    }
    .home-wrapper {
    top: 50%;
    -webkit-transform: translate(0 , 50%);
    transform: translate(0 , -50%);
    position: obs;
    position: relative;
    }
    a {
      cursor: pointer;
    }
</style>
