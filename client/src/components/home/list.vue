<template>
  <div>
    <div class="bg-img">
      <div class="container-content">
          <div class="header" style="text-align:center">
            <hr>
          </div>
        <div class="popular-session">
          <div class="row">
            <div class="col-md-8">
              <div style="text-align:center">
                <h3 class="head-title"><b> Popular Songs</b></h3>
              </div>
              <ul class="pagination">
                <li class="page-item"><a class="page-link" @click="prev()">Previous</a></li>
                <li v-for="page in pagination" :key="page">
                  <a v-bind:class="(page == currentPage)?'active':false" class="pagi" @click="getPag(page)">{{page }}</a>
                </li>
                <li class="page-item"><a class="page-link" @click="next()">Next</a></li>
              </ul>
              <pre v-if="check.mess">{{check.mess}}</pre>
              <div class="row " 
                v-for="song in listSong.popularListSong" 
                v-bind:key="song._id"     
                @mouseover="hover(song.id)"
                @mouseleave="leave(song.id)">
                <div class="col-lg-12">
                  <div class="cta_inner  ">
                    <div class="mb-md-0 mb-4 text-center">
                      <p><span>From:</span> {{song.userID.usersName}} 
                        <a v-if="(check.token !== song.userID._id)?true:false" @click="follow(song.userID._id)">
                          <span class="followCheck" v-if="(check.checkFollow && check.checkFollow.indexOf(song.userID._id) !== -1)">
                            <img src="../../assets/image/img_193993.png" alt="">
                            Following
                          </span>
                        </a>
                        <a  @click="(check.token)?follow(song.userID._id):navigateTo({name: 'login'})">
                          <span class="followCheck" v-if="(!check.checkFollow || check.checkFollow.indexOf(song.userID._id) == -1)">Follow</span>
                        </a>
                        </p>
                      <h1>{{song.title}}</h1>
                      <p><span>Artist:</span>   {{song.artist}}  <span>||</span> <span>Album:</span>  {{song.album}}</p>
                    </div>
                    <div :class="song.id" class="action-song">
                      <a v-if="check.token" 
                        @click="love(song._id)"  class="main_btn">
                        {{(favorites.checkFavorites)?(favorites.checkFavorites.indexOf(song._id)== -1)?'Love':'Loved':'Love'}}
                      </a>
                      <a @click="navigateTo({ name: 'songDetail', params: {songID : song._id}})" class="main_btn">View</a>
                      <a 
                        v-if="check.token" 
                        @click="bookmark(song._id)" 
                        class="main_btn">
                          {{(check.checkBookmark)?(check.checkBookmark.indexOf(song._id)== -1)?'Bookmark':'Unbookmark':'Unbookmark'}}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                <div class="col-sm-4">
                  <div class="row">
                  <h3 class="head-title"><b> New Songs</b></h3>
                  <div class="cont-newSong">
                    <div v-for="newSong in listSong.listNewSong" v-bind:key="newSong._id">
                      <div class="newSong">
                      <h2> {{newSong.title}} </h2>
                      <div> Artist: {{newSong.artist}}</div>
                      <v-btn @click="navigateTo({ name: 'songDetail', params: {songID : newSong._id}})" color="light-blue">View</v-btn>
                      <hr>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>

      </div>
    </div>
        <!-- The App Section -->
        <div class="container">
        <div class="row">
        </div>
        </div>
    </div>
    <div class="follow">
    <h2 class="head-title"><b>Following:</b> 
      <hr>
    </h2>
    <div class="getSomeFollow" v-if="!check.following || check.following.length == 0"><a href="">Are you want follow someone?</a> </div>
    <div class="row" >
      <div v-for="following in check.following" :key="following._id">
        <div v-if="following.songs.length == 0"> no updated for you</div>
        <div class="col-lg-6 mb-4"  v-if="following.songs.length" >
          <blockquote v-for="songfl in following.songs" :key="songfl._id" class="blockquote">
            <p class="mb-0 d-flex align-items-center">
              <cite>From :{{following.usersName}}</cite>
            </p>
            <div>
              <p>Song:{{songfl.title}}</p> 
              <p>Date:{{songfl.createdAt}}</p>
            </div>
            <v-btn @click="navigateTo({ name: 'songDetail', params: {songID : songfl._id}})" color="light-blue">View</v-btn>
          </blockquote>
        </div>
      </div>
    </div>
  </div>
  </div>

</template>

<script>
export default {
  name: 'list',
  components: {
  },
  computed: {
    // mix the getters into computed with object spread operator
    check () {
      return this.$store.users.getters.getDataUser
    },
    following () {
      return this.$store.users.getters.getDataUser.following
    },
    listSong () {
      return this.$store.songs.getters.getDataSong
    },
    pagination () {
      let makeListPagi = {}
      let pagi = this.$store.songs.getters.getDataSong.pagination
      for (let i = 0; i < pagi/this.perPagination ; i++) {
        makeListPagi[i] = []
        for (let index = 0; index < this.perPagination; index++) {
          if(i*this.perPagination + index +1 <= pagi) {
           makeListPagi[i].push(i*this.perPagination + index +1)
          }
        }
      }
      if(this.currentPage%this.perPagination == 0)
      {
        return makeListPagi[this.currentPage/this.perPagination - 1]
      }
      let show = Math.floor(this.currentPage/this.perPagination)
      return makeListPagi[show]
    },
    favorites () {
      return this.$store.songs.getters.getDataSong
    },
  },
  data () {
    return {
      perPage: 4,
      perPagination: 3,
      currentPage: 1,
      items: {},
    }
  },
  methods: {
    love (songID) {
      this.$store.songs.dispatch('rating' , {
        songID : songID,
        userID: localStorage.token
      })
      this.$forceUpdate()
    },
    hover (songID) {
      let show = $(".".concat(songID))
      show.addClass("showView")
    },
    leave (songID) {
      let show = $(".".concat(songID))
      show.removeClass("showView")
      console.log($(".".concat(songID)));
    },
    getPag(value) {
      this.currentPage = value
      let getActive = $("a.pagi") //get element 
      for (let index = 0; index < getActive.length; index++) {
        let isActive = $(getActive[index])
        if(isActive.text() == this.currentPage) {
          isActive.addClass("active")
        }
        else {
          isActive.removeClass( "active" )
        }
      }
      this.$store.songs.dispatch('getPopularSong' , {
      perPage: this.perPage,
      currentPage: this.currentPage,
      })
    },
    navigateTo (route) {
      this.$router.push(route)
    },
    prev () {
      console.log(this.currentPage);
      
      if(this.currentPage > 1) {
        this.currentPage -= 1
        let getActive = $("a.pagi") //get element 
        for (let index = 0; index < getActive.length; index++) {
          let isActive = $(getActive[index])
          if(isActive.text() == this.currentPage) {
            isActive.addClass("active")
          }
          else {
            isActive.removeClass( "active" )
          }
        }
      }
      this.$store.songs.dispatch('getPopularSong' , {
      perPage: this.perPage,
      currentPage: this.currentPage,
      })
    },
    next () {
      if(this.currentPage < this.listSong.pagination) {
        this.currentPage += 1

        let getActive = $("a.pagi") //get element 
        for (let index = 0; index < getActive.length; index++) {
          let isActive = $(getActive[index])
          if(isActive.text() == this.currentPage) {
            isActive.addClass("active")
            console.log(isActive);
            
          }
          else {
            isActive.removeClass( "active" )
          }
        }
      }
        this.$store.songs.dispatch('getPopularSong' , {
        perPage: this.perPage,
        currentPage: this.currentPage,
      })
    },
    bookmark (songID) {
      this.$store.users.dispatch('bookmark' , {
        songID: songID,
        userID: localStorage.token
      })
    },
     follow (followID) {
       this.$store.users.dispatch('follow' , {
        followID: followID,
        userID: localStorage.token
      })
    },
  },
  mounted () {
      this.$store.songs.dispatch('getPopularSong' , {
        perPage: this.perPage,
        currentPage: this.currentPage,
      })
      this.$store.songs.dispatch('getNewSong')
      this.$store.songs.dispatch('checkLove' , localStorage.token )
      this.$store.users.dispatch('getFollowingForHome' , localStorage.token)
      this.$store.users.dispatch('checkBookmark' , {
      userID : localStorage.token
      })
      this.$store.users.dispatch('checkFollow' , {
      userID : localStorage.token
      })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing:border-box;
}
.head-title {
    height: 100px;
    text-transform: uppercase;
    margin: 0px;
    text-align: center;
    padding: 30px;
}
.head-title hr {
  border: solid 2px #b7cce8;
  width: 200px;
  left: 50%;
  position: relative;
  transform: translate(-50%);
}

.active {
  background-color: #609de2;
  color: white;
}
a:hover {
  cursor: pointer;
}
.pagination a:hover:not(.active) {background-color: #ddd;}
.left p {
  text-align: left;
}
.left  button{
  float: left;
}
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
.row:after {
  content: "";
  display: table;
  clear: both
}

.column-66 {
  float: left;
  width: 66.66666%;
  padding: 20px;
}
.pagination{ 
  color: black;
  padding: 8px 16px;
  text-decoration: none;
}
.column-33 {
  float: left;
  width: 33.33333%;
  padding: 20px;
}

.large-font {
  font-size: 48px;
}

.xlarge-font {
  font-size: 64px;
  margin: 0px
}
.container-content {
  padding: 0px 20px;
  width: 80%;
  margin: auto;
}
.button {
  border: none;
  color: white;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4CAF50;
}

img {
  display: block;
  height: auto;
  max-width: 100%;
}
.well {
  height: 150px;
  margin-bottom: 50px;
  background: none;
  border: none;
  box-shadow: none;
}
.follow {
  min-height: 200px;
  padding: 20px;
}
.getSomeFollow {
  margin: 60px;
}
.right {
      width: 100px;
}
.cta_inner {
    padding: 10px 68px;
    position: relative;
    z-index: 1;
    margin-bottom: 10px;
    border-radius: 50px;
    filter: alpha(opacity=30);
    background-image: linear-gradient(to left, rgba(109, 116, 148, 0), rgb(16, 188, 240));
    background: 0.5;
}
.cta_inner p {
    color: #ffffff;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0;
    margin-top: 20px;
}
.cta_inner h1 {
    color: #ffffff;
    font-size: 42px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 0px;
}
.cta_inner .main_btn {
    background: #ffffff;
    color: #262533;
}
.main_btn {
    text-align: center;
    padding: 0px;
    position: relative;
    display: inline-block;
    background: #B3E5FC;
    color: #fff;
    font-family: "Roboto Condensed", sans-serif;
    font-size: 15px;
    font-weight: 700;
    line-height: 32px;
    border: 0px;
    outline: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    text-align: center;
    cursor: pointer;
    border-radius: 0px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    z-index: 1;
    -webkit-transition: all 300ms linear 0s;
    transition: all 300ms linear 0s;
}
a {
    color: #007bff;
    text-decoration: none;
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
}
.text-center img {
  width: 20px;
  display: inline;
  margin-left: 20px;
}
.text-center span {
  margin-bottom: 20px;
  color: black;
  font-weight: bold;
  margin-left: 20px;
}
.text-center {
  text-align: left;
  width: 70%;
  display: inline-block;
}
.imgAlbum {
  width: 100px;
}

.action-song a {
    text-align: center;
    margin-right: 0px;
    position: relative;
    display: block;
    margin-top: 10px;
    left: 100%;
    -webkit-transform: translate(-100%);
    transform: translate(-100%);
    border-radius: 40px;
}
.action-song {
  display: none;
  width: 100px;
}
.showView {
  display: inline-block;
  width: 20%;
}
.header hr{
  border: solid 2px #b7cce8;
  left: 50%;
  -webkit-transform: translate(-50% , 0);
  transform: translate(-50% , 0);
  position: relative;
}
.popular-session {
  padding-top: 0px;
}
.cont-newSong {
  width: 70%;
  margin: auto;
  border: 2px solid;
  padding: 40px;
  border-radius: 50px;
}
.followCheck {
  border: solid 2px white;
  padding: 5px;
}
@media screen and (max-width: 1000px) {
  .column-66,
  .column-33 {
    width: 100%;
    text-align: center;
  }
  img {
    margin: auto;
  }
}
</style>
