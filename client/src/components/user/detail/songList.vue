<template>
  <div>
    <div>
      <all-song></all-song>
      <v-btn fab @click="navigateTo({name: 'createSong',})" color="light blue">
        <v-icon>add</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { Validator } from 'vee-validate'
import allSong from '../../song/getSongOfUser'
// import { mapGetters } from 'vuex'
export default {
  name: 'song-user',
  components: {
    allSong
  },
  methods: {
    navigateTo (route) {
      console.log(route)
      this.$router.push(route)
    },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
