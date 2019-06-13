// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {sync} from 'vuex-router-sync'
import store from './store'
import VeeValidate from 'vee-validate'
import VueCookies from 'vue-cookies'
import VueYoutube from 'vue-youtube'
 
import BootstrapVue from 'bootstrap-vue'

console.log(router);

Vue.use(BootstrapVue)
Vue.use(VueYoutube)
Vue.use(VueCookies)
Vue.use(VeeValidate, {
  events: 'change|blur'
}); //validate framwork
Vue.use(Vuetify) // vuetify framwork
Vue.config.productionTip = false
/* eslint-disable no-new */
sync(store.songs, router, { moduleName: 'RouteModule'}) // đồng bô state với router để dùng trong router
sync(store.users, router, { moduleName: 'RouteModule'})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
