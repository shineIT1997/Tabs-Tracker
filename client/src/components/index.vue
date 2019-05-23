<template>
    <div>
        <header-home></header-home>
        <nav-menu></nav-menu>
        <list></list>
    </div>
</template>

<script>
import headerHome from './home/header'
import NavMenu from './home/nav'
import List from './home/list'
export default {
  components: {
    headerHome,
    List,
    NavMenu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
