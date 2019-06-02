import Vue from 'vue'
import Vuex from 'vuex'
import commentAPIs from '../api/commentApi/commentServices'
Vue.use(Vuex)
export default new Vuex.Store({
  strict: true,
  state: {
    mess: null,
    comments: null
  },
  getters: {
    getCommentData: state => {
      return state
    },
  },
  mutations: {
      async getMess(state , data) {
          state.mess = data
          console.log(state.mess);
      },
      async getComments(state , data) {
          state.comments = data
      }
  },
  actions: {

    async newComment ({commit}, data) {
      try {
        let result = await commentAPIs.newComment(data)
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat
    async show ({commit}, data) {
      try { 
        let result = await commentAPIs.show(data)
        console.log(result);
        commit('getMess' , result.data.mess)

      }
      catch (err) {
        console.log(err);
      }
    },// maked by dat
    async getCommentForSong ({commit}, data) {
      try { 
        let result = await commentAPIs.getCommentForSong(data)
        console.log(result);
        commit('getComments' , result.data)
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat
    async replyComment ({commit}, data) {
      try { 
        let result = await commentAPIs.replyComment(data)
      }
      catch (err) {
        console.log(err);
      }
    } // maked by dat
  },
})