import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../api/userApi/userServices'
Vue.use(Vuex)
export default new Vuex.Store({
  strict: true,
  state: {
    token: localStorage.token||'',
    infoUser: JSON,
    mess: null,
    songOfUser: null,
    comments: null
  },
  getters: {
    getDataUser: state => {
      return state
    }
  },
  mutations: {
    async loginResult (state , data) {
      state.token = data
    },
    async getUser (state , data) {
      state.infoUser = data
    },
    async setMess (state , data) {
      state.mess = data
    },
    async getSongOfUser (state , data) {
      state.songOfUser = data
    },
    async getComments (state , data) {
      state.comments = data
    }
  },
  actions: {
    async register ({commit}, data) {
      try {
        let result = await usersAPI.register(data)
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat
    async login ({commit}, data) {
      try {
        let result = await usersAPI.login(data)
        console.log(result);
        localStorage.token=result.data.user
        commit('loginResult' , result.data.user)
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat
    async logout ({commit}, data) {
      try {
        localStorage.token = '';
        location.reload();
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat
    async getUser ({commit}, data) {
      try {
        let result = await usersAPI.getUser(data)
        commit('getUser' , result.data.user)
      }
      catch (err) {
        console.log(err);
      }
    }, // take info of a user is logging in
    async editUser ({commit}, data) {
      try {
        let result = await usersAPI.editUser(data)
        commit('setMess' , result.data.mess)
      }
      catch (err) {
        console.log(err);
      }
    }, // update info user
    async getSongOfUser ({commit}, data) {
      try {
        let result = await usersAPI.getSongOfUser(data)
        console.log(result);
        commit('getSongOfUser' , result.data)
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat
    async getComments ({commit}, data) {
      try {
        let result = await usersAPI.getComments(data)
        console.log(result);
        commit('getComments' , result.data)
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat
  }
  
})