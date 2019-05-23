<template>
    <div>
        <div class="header">
            <a @click="navigateTo({name: 'home'})"><h1>Tabs-Tracker</h1></a>
            <p>My supercool header</p>
        </div>
    </div>
</template>
<script>

export default {
  name: 'header-tabs',
  methods: {
    navigateTo (route) {
      console.log(route)
      this.$router.push(route)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    body {
    font-family: Arial;
    margin: 0;
    }

    /* Header/Logo Title */
    .header {
    padding: 60px;
    text-align: center;
    background: #1abc9c;
    color: white;
    font-size: 30px;
    }
    a:hover {
        text-decoration: none;
    }
</style>
