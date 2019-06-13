<template>
  <div>
    <pre v-if="info.mess">{{info.mess}}</pre>
    <form enctype="multipart/form-data" id="edit" class="modal-content" v-on:submit.prevent="edit">
        <div class="container">
          <div class="upload-btn-wrapper col-sm-3">
            <img v-bind:src="(info.infoUser.avatar)?info.infoUser.avatar:'../../assets/image/terrorist-avatar-face-round-512.png'" alt="">
            <span class="btn">Upload a file</span>
            <input type="file" v-on:change="handleFileUpload()" ref="file"/>
          </div>
            <div class="col-sm-4">
                <label for="userName"><b>User Name</b></label>
                <input v-model="info.infoUser.usersName" type="text" placeholder="Enter User Name" name="userName">
                <br>
                <label for="email"><b>Email</b></label>
                <input v-model="info.infoUser.email" type="text" placeholder="Enter Email" name="email" >
                <br> 
            </div>
            <div class="col-sm-4">
                <p>Total Song : <span>{{(info.infoUser.songs)?info.infoUser.songs.length:'0'}}</span></p>
                <p>Ngày Đăng ký: {{info.infoUser.createdAt}}</p>
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
  data () {
    return {
      userName: '',
      email: '',
      imgAlbum: ''
    }
  },

  methods: {
    edit () {
      console.log(this.imgAlbum);
        let editUser = document.getElementById('edit')
        let formData = new FormData(editUser)
        formData.append('file', this.imgAlbum);
        formData.append('id', localStorage.token);
        this.$store.users.dispatch('editUser',
          formData)
    },
    handleFileUpload () {
      console.log(this.$refs.file.files[0] );
      this.imgAlbum =  this.$refs.file.files[0]    
    }
  },
  mounted () {
    this.$store.users.dispatch('getUser', localStorage.token)
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
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.btn {
  border: 2px solid gray;
  color: gray;
  background-color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
  width: auto;
}

.upload-btn-wrapper input {
  font-size: 160px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.upload-btn-wrapper img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {
  .cancelbtn, .signupbtn {
     width: 100%;
  }

}
</style>
