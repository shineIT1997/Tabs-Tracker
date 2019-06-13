<template>
    <div>
        <!-- The App Section -->
        <div>
        <div class="row ">
            <div class="col-sm-8 middle">
                <h2>All of bookmark</h2>
                <div class="well" v-for="bookmark in bookmarks" :key="bookmark._id">
                    <div class="left">
                        <p>Name: {{bookmark.title}} </p>
                        <p>Artist: {{bookmark.artist}} </p>
                        <p>Album: {{bookmark.album}}</p>

                        <v-btn class="view" color="light-blue" >
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
    </div>
</template>

<script>
import { Validator } from 'vee-validate'
// import { mapGetters } from 'vuex'
export default {
  name: 'bookmark-user',
  computed: {
    bookmarks () {
      return this.$store.users.getters.getDataUser.bookmarks
    }
  },
  async mounted () {
    this.$store.users.dispatch('getBookmark' , {userID: localStorage.token})
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

