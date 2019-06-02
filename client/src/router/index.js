import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/index'
import Login from '@/components/user/login'
import Register from '@/components/user/register'
import profile from '@/components/user/profile'
import createSong from '@/components/song/createNewSong'
import songDetail from '@/components/song/songDetail'

Vue.use(Router)
const routers = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }, // user register
    {
      path: '/login',
      name: 'login',
      component: Login
    }, // user login
    {
      path: '/createSong',
      name: 'createSong',
      component: createSong
    }, // create song
    {
      path: '/user/profile',
      name: 'profileUser',
      component: profile,
      meta: {
        requiresAuth: true
      }
    }, // profile of user
    {
      path: '/song/detail/:songID',
      name: 'songDetail',
      component: songDetail
    }, // get detail of a song
  ]
})

routers.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.token) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default routers
