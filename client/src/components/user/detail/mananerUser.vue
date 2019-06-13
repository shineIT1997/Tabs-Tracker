<template>

  <div class="overflow-auto">
    <ul class="pagination">
      <li class="page-item"><a class="page-link" @click="prev()">Previous</a></li>
      <li v-for="page in pagination" :key="page">
        <a v-bind:class="(page == currentPage)?'active':false" class="pagi" @click="getPag(page)">{{page}}</a>
      </li>
      <li class="page-item"><a class="page-link" @click="next()">Next</a></li>
    </ul>

    <table class="table">
  <thead>
    <tr>
      <th scope="col">UserName</th>
      <th scope="col">Email</th>
      <th scope="col">Total Songs</th>
      <th scope="col">Created Date</th>
    </tr>
  </thead>
  <tbody v-for="data in dataUser.items" v-bind:key="data._id" >
    <tr>
      <td>{{data.usersName}}</td>
      <td>{{data.email}}</td>
      <td>{{data.songs.length}}</td>
      <td>{{data.createdAt}}</td>
      <td><button @click.prevent="del(data._id)" class="btn btn btn-danger">Delete</button></td>
      <td><button @click.prevent="edit(data._id)" class="btn btn btn-info">Edit</button></td>
      <td><button @click.prevent="Detail(data._id)" class="btn btn-primary">Detail</button></td>
    </tr>
  </tbody>
</table>
  <v-btn @click="addUser()">Add new user</v-btn>
  <form id="myform"   v-on:submit.prevent="register">
    <input v-model="a" type="text" name="abc">
    <input v-model="b" type="text" name="bcd">
    <button>  fdsfsd</button>
  </form>
  </div>
</template>

<script>
import { Validator } from 'vee-validate'
// import { mapGetters } from 'vuex'
export default {
  name: 'mananer-user',
  data() {
  return {
    a: '',
    b: '',
    perPage: 3,
    currentPage: 1,
    perPagination: 3,
    addUserActive: false,
  }
},
computed: {
  dataUser () {
    return this.$store.users.getters.getDataUser
  },
  pagination () {
    let makeListPagi = {}
    let pagi = this.$store.users.getters.getDataUser.allPagination
    console.log(pagi/this.perPagination);
    
    for (let i = 0; i < pagi/this.perPagination ; i++) {
      makeListPagi[i] = []
      for (let index = 0; index < this.perPagination; index++) {
        if(i*this.perPagination + index +1 <= pagi) {
          makeListPagi[i].push(i*this.perPagination + index +1)
        }
      }
    }
    if(this.currentPage%this.perPagination == 0)
    {
      return makeListPagi[this.currentPage/this.perPagination - 1]
    }
    let show = Math.floor(this.currentPage/this.perPagination)
    return makeListPagi[show]
  },
},
mounted () {
        console.log({
        token: localStorage.token,
        perPage: this.perPage,
        currentPage: this.currentPage,
      });
  this.$store.users.dispatch('getAllUsers', {
    token: localStorage.token,
    perPage: this.perPage,
    currentPage: this.currentPage,
  })
},
methods: {
  register () {
        let createsong = document.getElementById('myform');
        console.log(createsong);
        let formData = new FormData(createsong);
        formData.append('abc' , this.a)
        this.$store.songs.dispatch('testselect' ,
          formData)
  },

    addUser() {
      if(this.addUserActive) {
        this.addUserActive = false
        console.log('add');
      }
      else {
        $('.form-add').css({display: 'block'})
      }

    },
    del(deleteID) {
      this.$store.users.dispatch('deleteUser', {
        deleteID: deleteID,
        token: localStorage.token,
        perPage: this.perPage,
        currentPage: this.currentPage,
      })
    },
    getPag(value) {
      this.currentPage = value
      console.log(this.currentPage);
      
      let getActive = $("a.pagi") //get element 
      console.log(getActive);
      
      for (let index = 0; index < getActive.length; index++) {
        let isActive = $(getActive[index])
        if(isActive.text() == this.currentPage) {
          isActive.addClass("active")
        }
        else {
          isActive.removeClass( "active" )
        }
      }
      this.$store.users.dispatch('getAllUsers', {
        token: localStorage.token,
        perPage: this.perPage,
        currentPage: this.currentPage,
      })
    },
    prev () {
      if(this.currentPage > 1) {
        this.currentPage -= 1
        let getActive = $("a.pagi") //get element 
        for (let index = 0; index < getActive.length; index++) {
          let isActive = $(getActive[index])
          if(isActive.text() == this.currentPage) {
            isActive.addClass("active")
          }
          else {
            isActive.removeClass( "active" )
          }
        }
      }
      this.$store.users.dispatch('getAllUsers', {
        token: localStorage.token,
        perPage: this.perPage,
        currentPage: this.currentPage,
      })
    },
    next () {
      if(this.currentPage < this.dataUser.allPagination) {
        this.currentPage += 1

        let getActive = $("a.pagi") //get element 
        for (let index = 0; index < getActive.length; index++) {
          let isActive = $(getActive[index])
          if(isActive.text() == this.currentPage) {
            isActive.addClass("active")
          }
          else {
            isActive.removeClass( "active" )
          }
        }
        console.log({
        token: localStorage.token,
        perPage: this.perPage,
        currentPage: this.currentPage,
      });
        
        this.$store.users.dispatch('getAllUsers', {
        token: localStorage.token,
        perPage: this.perPage,
        currentPage: this.currentPage,
      })
      }
    },
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel {
  text-align: left;
}
.active {
  background-color: #609de2;
  color: white;
}
.table {
  text-align: left;
}
</style>
