<template>
    <div class="container">
        <div class="row">
            <div>
                <div>
                <h1>User</h1>
                    <div>
                        <a @click="getComponent('infoUser')">Your info</a>
                        <a @click="getComponent('songList')">Your Song</a>
                        <a @click="getComponent('comment')">Comment</a>
                        <a @click="getComponent('bookmark')">Bookmark</a>                   
                    </div>
                </div>
                <hr>
            </div>
            <div>
                <component v-bind:is="showComponent"></component>
            </div>
        </div>
    </div>
</template>
<script>
import infoUser  from './detail/infoUser'
import comment from './detail/comment'
import songList from './detail/songList'
import bookmark from './detail/bookmark'
export default {
  name: 'user-header',
  components: {
      infoUser,
      songList,
      comment,
      bookmark
  },
  created () {

  },
  data () {
      return {
        showComponent: infoUser,
      }
  },
  watch: {
    '$route.query.component': {
      immediate: true,
      handler (value) {
          if(value) {
            this.showComponent = value
          }
        console.log(this.showComponent);
      } // make value for search data (this.search) when add value at router
    }
  },
  methods: {
      async getComponent (component) {
        const route = this.$router
        route.query = {
          component: component
        }
        await this.$router.push(route)
        console.log();
        
        this.showComponent = route.query.component
      }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
    width: 50px;
    margin: 0px 50px 0px  50px;
}
hr {
    border-top: 2px solid #d09393;
}
</style>
