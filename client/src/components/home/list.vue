<template>
    <div>
        <div style="text-align:center">
        <h1 class="xlarge-font"><b> Recommended Song</b></h1>
        </div>

        <!-- The App Section -->
        <div class="container">
        <div class="row">
             <div class="col-sm-4">
               <div class="row">
                <h2>New song</h2>
                <div v-for="newSong in listSong.listNewSong" v-bind:key="newSong._id">
                  <div>
                    <h5>Title: {{newSong.title}} </h5>
                    <div> Artist: {{newSong.artist}}</div>
                    <v-btn @click="navigateTo({ name: 'songDetail', params: {songID : newSong._id}})" color="light-blue">View</v-btn>
                  </div>
                </div>
              </div>
               <div class="row">
                <h2>Flowing</h2>
                <div v-for="newSong in listSong.listNewSong" v-bind:key="newSong._id">
                  <div>
                    <h5>Title: {{newSong.title}} </h5>
                    <div> Artist: {{newSong.artist}}</div>
                    <v-btn @click="navigateTo({ name: 'songDetail', params: {songID : newSong._id}})" color="light-blue">View</v-btn>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
                <h2>Popular Song</h2>
                <div class="well" v-for="song in listSong.popularListSong" v-bind:key="song._id">
                    <div class="left">
                        <p>Name:  {{song.title}}</p>
                        <p>Artist:  {{song.artist}}</p>
                        <p>Album: {{song.album}}</p>
                        <v-btn @click="navigateTo({ name: 'songDetail', params: {songID : song._id}})" class="view" color="light-blue" >
                            View
                        </v-btn>
                    </div>
                    <div class="right">
                        {{(song.imgAlbum)?song.imgAlbum:'Unknown'}}
                    </div>
                </div>
            </div>
            <ul class="pagination" v-if="listSong.paganation">
              <li class="page-item"><a class="page-link" @click="prev()">Previous</a></li>
              <li>
                <a class="pagi active"
                  @click="getPag((currentPage  >= listSong.paganation)?currentPage-2:(currentPage  >= listSong.paganation -1)?currentPage-1:currentPage)">
                  {{(currentPage  >= listSong.paganation)?currentPage-2:(currentPage  >= listSong.paganation -1)?currentPage-1:currentPage }}</a>
                <a class="pagi" 
                  @click="getPag((currentPage  >= listSong.paganation)?currentPage-1:(currentPage  >= listSong.paganation -1)?currentPage:currentPage+1)">
                  {{(currentPage  >= listSong.paganation)?currentPage-1:(currentPage  >= listSong.paganation -1)?currentPage:currentPage+1 }}</a>
                <a class="pagi"
                  @click="getPag((currentPage  >= listSong.paganation)?currentPage:(currentPage  >= listSong.paganation -1)?currentPage+1:currentPage+2)">
                  {{(currentPage  >= listSong.paganation)?currentPage:(currentPage  >= listSong.paganation -1)?currentPage+1:currentPage+2 }}</a>
              </li>
              <li class="page-item"><a class="page-link" @click="next()">Next</a></li>
            </ul>
        </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'list',
  computed: {
    // mix the getters into computed with object spread operator
    listSong () {
      return this.$store.songs.getters.getDataSong
    },
  },
  data () {
    return {
      perPage: 3,
      currentPage: 1,
      items: {},
    }
  },
  methods: {
    getPag(value) {
      console.log($("a.pagi"));
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
      this.$forceUpdate()
    },
    navigateTo (route) {
      this.$router.push(route)
    },
    prev () {
      if(this.currentPage > 1) {
        this.currentPage -= 1
        console.log(this.currentPage);
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
      this.$forceUpdate()
    },
    next () {
      if(this.currentPage < this.listSong.paganation) {
        this.currentPage += 1
        console.log(this.currentPage);
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
      this.$forceUpdate()
    },
    getCurrentPage () {

    }
  },
  async mounted () {
      this.$store.songs.dispatch('getPopularSong' , {
        perPage: this.perPage,
        currentPage: this.currentPage,
      })
      this.$store.songs.dispatch('getNewSong')
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing:border-box;
}
.active {
  background: blue;
}
a:hover {
  cursor: pointer;
}
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

.container {
  padding: 64px;
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

.column-33 {
  float: left;
  width: 33.33333%;
  padding: 20px;
}

.large-font {
  font-size: 48px;
}

.xlarge-font {
  font-size: 64px
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
.row {
  border: solid 1px black
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
