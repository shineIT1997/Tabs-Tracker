<template>
  <div>
    <header-home></header-home>
    <user-header></user-header>
  </div>
</template>

<script>
import headerHome from '../home/header'
import userHeader from './userheader'
import { Validator } from 'vee-validate'
// import { mapGetters } from 'vuex'
export default {
  name: 'profile-user',
  components: {
      headerHome,
      userHeader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
