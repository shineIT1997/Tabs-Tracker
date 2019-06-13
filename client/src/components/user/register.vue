<template>
<div>
  <nav-header></nav-header>
  <form  class="modal-content " v-on:submit.prevent="register">
    <div class="container panel panel-primary">
        <div class="panel-heading">
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
        </div>
        <div class="panel-body">
            <label for="userName"><b>User Name</b></label>
            <input data-vv-validate-on="blur" v-validate="'required'" v-model="username" type="text" placeholder="Enter User Name" name="userName">
            <small 
            v-if="errors.has('userName')"
            class="text-danger form-text">
                {{ errors.first('userName') }}
            </small><br>
            <label for="email"><b>Email</b></label>
            <input data-vv-validate-on="blur" v-validate="'required|email'" v-model="email" type="text" placeholder="Enter Email" name="email" >
            <small 
            v-if="errors.has('email')"
            class="text-danger form-text">
                {{ errors.first('email') }}
            </small><br>
            <label for="psw"><b>Password</b></label>
            <input data-vv-validate-on="blur" v-validate="'required|min:6'" v-model="password" type="password" placeholder="Enter Password" ref="password" name="password">
            <small 
            v-if="errors.has('password')"
            class="text-danger form-text">
                {{ errors.first('password') }}
            </small><br>
            <label for="psw-repeat"><b>Repeat Password</b></label>
            <input data-vv-validate-on="blur" v-validate="'required|confirmed:password'" v-model="confPass" type="password" placeholder="Repeat Password" name="password-repeat">
            <small 
            v-if="errors.has('password-repeat')"
            class="text-danger form-text">
                {{ errors.first('password-repeat') }}
            </small>
            <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p>
            <div class="clearfix">
                <button>Sign Up</button>
            </div>
            <p>if you had a account, let <a @click="navigateTo({name: 'login'})">Login</a></p>
        </div>
    </div>
  </form>
</div>
</template>
<script>
import navHeader from '../home/nav'
import { Validator } from 'vee-validate'
export default {
  name: 'register',
  components: {
    navHeader
  },
  data () {
    return {
      username:'',
      email: '',
      password: '',
      confPass: ''
    }
  },
  methods: {
    navigateTo (route) {
      console.log(route)
      this.$router.push(route)
    },
    register () {
      this.$validator.validate()
      .then(async valid => {
        if(valid) {
          await this.$store.users.dispatch('register', {
            username: this.username,
            email: this.email,
            password: this.password
          })
        }
        if(localStorage.token) {
          this.$router.push({ name : 'home'})
        }
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
  background: #f1f1f1;
}

/* Add a background color when the inputs get focus */
input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
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
  width: 50%; /* Could be more or less, depending on screen size */
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
