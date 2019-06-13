<template>
<!-- Footer -->
<footer class="page-footer font-small stylish-color-dark pt-4">


  <ul class="list-unstyled list-inline text-center py-2">
    <li class="list-inline-item">
      <h5 class="mb-1">{{(!loginCheck.token)?'Register for free':'If you like its, Recommend app for your friends'}}</h5>
    </li>
    <li v-if="!loginCheck.token" class="list-inline-item">
      <a href="#!" class="btn btn-danger btn-rounded">Sign up!</a>
    </li>
  </ul>
  <!-- Call to action -->

  <hr>
<div class="footer-contact">
  <ul class="  list-unstyled list-inline text-center">
    <li class="list-inline-item">
      <a class="btn-floating btn-fb mx-1">
          <img src="../../assets/image/fb.png" alt="">
      </a>
    </li>
    <li class="list-inline-item">
      <a class="btn-floating btn-tw mx-1">
        <img src="../../assets/image/fb.png" alt="">
      </a>
    </li>
    <li class="list-inline-item">
      <a class="btn-floating btn-gplus mx-1">
        <img src="../../assets/image/fb.png" alt="">
      </a>
    </li>
    <li class="list-inline-item">
      <a class="btn-floating btn-li mx-1">
        <img src="../../assets/image/fb.png" alt="">
      </a>
    </li>
    <li class="list-inline-item">
      <a class="btn-floating btn-dribbble mx-1">
        <img src="../../assets/image/fb.png" alt="">
      </a>
    </li>
  </ul>
  <!-- Social buttons -->

  <!-- Copyright -->
  <div class="footer-copyright text-center py-3">Design by:
    <a href="https://www.facebook.com/messages/t/Shine805"> Thành Đạt</a>
  </div>
</div>
  <!-- Social buttons -->

  <!-- Copyright -->

</footer>
<!-- Footer -->
</template>

<script>
import { Store } from 'vuex';
export default {
  name: 'footer-content',
  computed: {
    loginCheck () {
      let a = this.$store.users.getters.getDataUser
      return a
    },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
    margin-top: 20  px;
} 
.btn-floating img {
    height: 60px;
    width: 60px;
}
/* Header/Logo Title */
.footer-contact {
  position: relative;
  background-image: linear-gradient(to top, rgba(103, 198, 232, 0.8), rgba(213, 218, 219, 0));
}
</style>
