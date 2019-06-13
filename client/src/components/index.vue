<template>
    <div>
        <header-home></header-home>
        <home-content></home-content>
        <footer-content></footer-content>
    </div>
</template>

<script>
import headerHome from './home/header'
import homeContent from './home/body'
import footerContent from './home/footer'
export default {
  components: {
    headerHome,
    homeContent,
    footerContent
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
