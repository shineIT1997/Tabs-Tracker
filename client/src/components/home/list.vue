<template>
    <div>
        <div style="text-align:center">
        <h1 class="xlarge-font"><b> Recommended Song</b></h1>
        </div>

        <!-- The App Section -->
        <div class="container">
        <div class="row">
             <div class="col-sm-4">
                <h2>New song</h2>
                <h5>Photo of me:</h5>
                <div class="fakeimg">Fake Image</div>
                <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
                <h3>Some Links</h3>
                <p>Lorem ipsum dolor sit ame.</p>
            </div>
            <div class="col-sm-8">
                <h2>Popular Song</h2>
                <div class="well">
                    <div class="left">
                        <p>Name:  </p>
                        <p>Artist:  </p>
                        <p>Album: </p>
                        <v-btn color="light-blue">
                            View
                        </v-btn>
                    </div>
                    <div class="right">
                        hinh ảnh
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'list'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing:border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
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
}
.row {
  height: 1090px;
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
