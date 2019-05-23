<template>
    <div>
        <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
            </div>
            <ul class="nav navbar-nav">
            <li class="active"><a @click="navigateTo({name: 'home',})">Home</a></li>
            <li><a @click="navigateTo({name: 'topRate',})">Top Rating</a></li>
            <li><a @click="navigateTo({name: 'listNew',})">New Song</a></li>
            </ul>
            <form class="navbar-form navbar-left">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Search" name="search">
            </div>
            <button class="btn btn-default">Submit</button>
            </form>
            <ul class="nav navbar-nav navbar-right">
            <li><a class="btn btn-primary" role="button" @click="navigateTo({name: 'login',})">Login</a></li>
            <li><a @click="navigateTo({name: 'register',})">Register</a></li>
            </ul>
        </div>
        </nav>
    </div>

</template>

<script>

export default {
  name: 'nav-menu',
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
</style>
