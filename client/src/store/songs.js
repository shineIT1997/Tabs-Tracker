import Vue from 'vue'
import Vuex from 'vuex'
import songsAPI from '../api/songApi/songServices'
Vue.use(Vuex)
export default new Vuex.Store({
  strict: true,
  state: {
    searchList: null,
    popularListSong: null,
    listNewSong: null,
    songDetail: null,
    mess: null,
    pagination: Number,
    checkFavorites: null
  },
  getters: {
    getDataSong: state => {
      return state
    },  
  },
  mutations: {
    async setPopularListPoSong (state , data) {
      let perPage = data.data.perPage //tổng số items trên trang
      let currentPage = data.data.currentPage -1 //trang hien tai
      console.log({currentPage: currentPage});
      
      let items = {}
      let allSong = data.result
      let count = perPage*currentPage //mốc đếm để get dữ liêu cho page
      for (let i = 0; i < perPage; i++){
        if(allSong[count + i]) {
          items[i] = allSong[count + i]
        }
      }
      state.pagination = Math.ceil(allSong.length/perPage) 
      state.popularListSong = items 
    },
    async setNewSong (state , data) {
      state.listNewSong = data
    },
    async setSearchList (state , data) {
    state.searchList = data
    },
    async setDetailSong (state , data) {
      state.songDetail = data
    },
    async getMess (state , data) {
      state.mess = data
    },
    async checkFavorites (state , data) {
      state.checkFavorites = data
    }
  },
  actions: {
    async createSong ({commit}, data) {
      try {
        let result = await songsAPI.createSong(data)
        console.log(result );
        commit('getMess' , result.data.mess)
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat
    async getPopularSong ({commit}, data) {
      try {
        let result = await songsAPI.getPopularSong()
        commit('setPopularListPoSong' , {
          result: result.data,
          data: data
        })
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat
    async findSong ({commit}, data) {
      try {
        let result = await songsAPI.findSong(data)
        commit('setSearchList' , result.data)
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat
    async deleteSong ({commit}, data) {
      try {
        let result = await songsAPI.deleteSong(data)
        commit('getMess' , result.data)
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat
    async getDetailSong ({commit}, data) {
      try {
        let result = await songsAPI.getDetailSong(data)
        commit('setDetailSong' , result.data)
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat
    async editSong ({commit}, data) {
      try {
        let result = await songsAPI.editSong(data)
      }
      catch (err) {
        console.log(err);
      }
    },
    async getNewSong ({commit}, data) {
      try {
        let result = await songsAPI.getNewSong()
        commit('setNewSong' , result.data)
      }
      catch (err) {
        console.log(err);
      }
    },
    async getSongList ({commit}, data) {
      try {
        let result = await songsAPI.getSongList(data)
        commit('setPopularListPoSong' , {
          result: result.data,
          data: data
        })
      }
      catch (err) {
        console.log(err);
      }
    },
    async rating ({commit}, data) {
      try {
        let result = await songsAPI.rating(data)
        commit('checkFavorites' , result.data.checkFavorites)
      }
      catch (err) {
        console.log(err);
      }
    },
    async checkLove ({commit}, data) {
      try {
        let result = await songsAPI.checkLove({data})
        commit('checkFavorites' , result.data.checkFavorites)
      }
      catch (err) {
        console.log(err);
      }
    },
    async testselect ({commit}, data) {
      try {
        let result = await songsAPI.testselect({data})
      }
      catch (err) {
        console.log(err);
      }
    },
  }, //end action
})