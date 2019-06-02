<template>
    <div>
        <!-- The App Section -->
        <div>
        <div class="row ">
            <div class="col-sm-8 middle">
                <h2>All of Mine</h2>
                <div class="well" v-for="song in listSong" v-bind:key="song._id">
                    <div class="left">
                        <p>Name:  {{song.title}}</p>
                        <p>Artist:  {{song.artist}}</p>
                        <p>Album: {{song.album}}</p>
                        <v-btn @click="navigateTo({ name: 'songDetail', params: {songID : song._id}})" class="view" color="light-blue" >
                            View
                        </v-btn>
                        <v-btn @click="deleteSong(song._id)" class="view" color="light-blue" >
                            Del
                        </v-btn>
                    </div>
                    <div class="right">
                        hinh ảnh
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </div>
        </div>
        <pre>{{listSong}}</pre>
    </div>
</template>

<script>

export default {
  name: 'getSongPopular',
  data () {
    return {
    }
  },
  computed: {
    // mix the getters into computed with object spread operator
    listSong () {
        return this.$store.users.state.songOfUser
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async deleteSong (songID) {
      await this.$store.songs.dispatch('deleteSong' , {
        user: localStorage.token,
        song: songID
      })
    }
  },
  async mounted () {
    await this.$store.users.dispatch('getSongOfUser' , localStorage.token)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing:border-box;
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
.middle {
  left: 50%;
  transform: translate(-50% , 0px)
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
