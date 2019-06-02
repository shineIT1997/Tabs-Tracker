<template>
  <div>
    <div class="panel panel-primary">
      <div class="panel-heading">Comment</div>
      <div class="panel-body">
        <ul class="list-group" v-for="comment in showComment.comments" v-bind:key="comment._id">
          <li class="list-group-item">
            <p>
              UserName: <span>{{(comment.userID)?comment.userID.usersName:'Guest'}}</span>
            </p>
            <p>
              Content: <span>{{comment.content}}</span>
            </p>
            <p>
              Song: <span>{{comment.songID.title}}</span>
            </p>
              <v-btn @click="show(comment._id)" color="light blue">
                Duyệt
              </v-btn>
              <v-btn color="light blue">
                Không Duyệt
              </v-btn>
          </li>
          <p v-show="showComment.mess">{{showComment.mess}}</p>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Validator } from 'vee-validate'
// import { mapGetters } from 'vuex'
export default {
  name: 'comment-user',
  async created() {
    await this.$store.users.dispatch('getComments', {
      userID: localStorage.token
    })
  },
  computed: {
    showComment () {
      return this.$store.users.getters.getDataUser
    }
  },
  methods: {
    show (commentID) {
      this.$store.comments.dispatch('show' , commentID)
      this.$forceUpdate()
    },
    deleteComment () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel {
  text-align: left;
}
</style>
