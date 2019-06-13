<template>
  <div>
        <pre v-if="mess">{{mess}}</pre>
    <form class="modal-content" v-on:submit.prevent="edit">
        <div class="container">
            <div class="left col-sm-8">
                <label for="userName"><b>User Name</b></label>
                <input v-model="userName" type="text" placeholder="Enter User Name" name="userName">
                <br>
                <label for="email"><b>Email</b></label>
                <input v-model="email" type="text" placeholder="Enter Email" name="email" >
                <br> 
            </div>
            <div class="col-sm-4">
                <p>Total Song : 12</p>
                <p>Ngày Đăng ký: date</p>
                <button>Edit</button>
            </div>
        </div>
    </form>
  </div>
</template>
<script>
import { Validator } from 'vee-validate'
import { mapGetters } from 'vuex'
export default {
  name: 'info-user',
  computed: {
    // mix the getters into computed with object spread operator
    info  () {
        let info = this.$store.users.getters.getDataUser
        return info
    }
  },
  async created() {
    await this.$store.users.dispatch('getUser', localStorage.token)
    console.log(this.$store.users.state.infoUser);
    let info = this.$store.users.state.infoUser
    this.userName =  info.usersName
    this.email =  info.email
  },
  data () {
    return {
      userName: '',
      email: '',
    }
  },
   beforeCreate() {

  },
//     mounted() {
//     let info = this.$store.users.state.infoUser
//     this.userName =  info.usersName
//     this.email =  info.email
//   },
  methods: {
    edit () {
        this.$store.users.dispatch('editUser', {
          update: {
            usersName: this.userName,
            email: this.email,
          },
          id: localStorage.token
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box;}

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
}

/* Add a background color when the inputs get focus */
input[type=text]:focus, input[type=password]:focus {
  outline: none;
}

/* Set a style for all buttons */
button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: auto;
  border: none;
  cursor: pointer;
  width: 30%;
  opacity: 0.9;
  display: block;
}

button:hover {
  opacity:1;
}

/* Extra styles for the cancel button */
.cancelbtn {
  padding: 14px 20px;
  background-color: #f44336;
}
label {
    float: left;
}
/* Float cancel and signup buttons and add an equal width */
.cancelbtn, .signupbtn {
  width: 50%;
}

/* Add padding to container elements */
.container {
  padding: 16px;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: #474e5d;
  padding-top: 50px;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* Style the horizontal ruler */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}
/* The Close Button (x) */
.close {
  position: absolute;
  right: 35px;
  top: 15px;
  font-size: 40px;
  font-weight: bold;
  color: #f1f1f1;
}

.close:hover,
.close:focus {
  color: #f44336;
  cursor: pointer;
}

/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {
  .cancelbtn, .signupbtn {
     width: 100%;
  }
}
</style>
