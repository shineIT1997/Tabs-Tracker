<template>
    <div>
        <header-home></header-home>
        <home-content></home-content>
    </div>
</template>

<script>
import headerHome from './home/header'
import homeContent from './home/body'
export default {
  components: {
    headerHome,
    homeContent
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
