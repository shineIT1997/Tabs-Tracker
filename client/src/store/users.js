import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../api/userApi/userServices'
Vue.use(Vuex)
export default new Vuex.Store({
  strict: true,
  state: {
    token: localStorage.token||'',
    infoUser: JSON,
    mess: '',
    songOfUser: null,
    comments: [],
    checkBookmark: null,
    bookmarks: null,
    following: null,
    checkFollow: null,
    userLogin: {
      userName: localStorage.userName||'',
      jurisdiction: localStorage.jurisdiction||''
    },
    items: null,
    allPagination: Number
  },
  getters: {
    getDataUser: state => {
      return state
    }
  },
  mutations: {
    async loginResult (state , data) {
      state.token = data.token
      state.userLogin.userName = data.userName
      state.userLogin.jurisdiction = data.jurisdiction
    },
    async getUser (state , data) {
      console.log(data);
      
      if(data.mess) {
        state.mess = data.mess
      }
      state.infoUser = data.result
    },
    async setMess (state , data) {
      state.mess = data
    },
    async getSongOfUser (state , data) {
      state.songOfUser = data
    },
    async getComments (state , data) {
      state.comments = data
    },
    async checkBookmark (state , data) {
      state.checkBookmark = data.data.checkBookmark
    },
    async checkFollow (state , data) {
      state.checkFollow = data.data.checkFollow
      state.mess = data.data.mess

      
    },
    async getBookmark (state , data) {
      console.log({book: data});
      state.bookmarks = data
    },
    async getFollowingForHome (state , data) {
      state.following = data
    },
    async getAllUsers (state , data) {
      let  currentPage = data.currentPage
      let  perPage = data.perPage
      let  allUsers = data.result
      let allPagination = Math.ceil(allUsers.length/perPage)
      let items = []
      for (let index = 0; index < perPage; index++) {
        if(allUsers[(currentPage-1)*perPage+index]) {
          items[index] = allUsers[(currentPage-1)*perPage+index];
        }
      }
      state.items = items
      state.allPagination = allPagination
    },
  },
  actions: {
    async register ({commit}, data) {
      try {
        let result = await usersAPI.register(data)
        localStorage.token = result.data.user.token
        localStorage.userName = result.data.user.userName
        localStorage.jurisdiction = result.data.user.jurisdiction
        commit('loginResult' , result.data.user)
        
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat
    async login ({commit}, data) {
      try {
        let result = await usersAPI.login(data)
        localStorage.token = result.data.user.token
        localStorage.userName = result.data.user.userName
        localStorage.jurisdiction = result.data.user.jurisdiction
        commit('loginResult' , result.data.user)
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat
    async logout ({commit}, data) {
      try {
        localStorage.token = '';
        localStorage.userName = '';
        localStorage.jurisdiction = '';
        location.reload();
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat
    async getUser ({commit}, data) {
      try {
        let result = await usersAPI.getUser(data)
        commit('getUser' , result.data)
      }
      catch (err) {
        console.log(err);
      }
    }, // take info of a user is logging in
    async editUser ({commit}, data) {
      try {
        let result = await usersAPI.editUser(data)
        commit('getUser' , result.data)
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
        commit('getComments' , result.data)
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat
    async bookmark ({commit}, data) {
      try {
        let result = await usersAPI.bookmark(data)
        console.log(result);
        commit('checkBookmark' , result)
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat
    async follow ({commit}, data) {
      try {
        let result = await usersAPI.follow(data)
        commit('checkFollow' , result)
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat
    async checkBookmark ({commit}, data) {
      try {
        let result = await usersAPI.checkBookmark(data)
        console.log({checkbook : result});
        
        commit('checkBookmark' , result)
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat be used check the song was bookmark
    async checkFollow ({commit}, data) {
      try {
        let result = await usersAPI.checkFollow(data)
        console.log({checkFollow : result});
        commit('checkFollow' , result)
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat be used check the song was bookmark
    async getBookmark ({commit}, data) {
      try {
        let result = await usersAPI.getBookmark(data)
        commit('getBookmark' , result.data)
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat be used when get the list of song for bookmark List 
    async getFollowing ({commit}, data) {
      try {
        let result = await usersAPI.getFollowing({userID: data})
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat be used to get song of users were followed by user
    async getFollowingForHome ({commit}, data) {
      try {
        let result = await usersAPI.getFollowingForHome({userID: data})
        commit('getFollowingForHome' , result.data.following)
      }
      catch (err) {
        console.log(err);
      }
    }, // maked by dat be used to get song of users were followed by user for homepage
    async getAllUsers ({commit}, data) {
      try {
        let result = await usersAPI.getAllUsers({data})
        commit('getAllUsers' , {
          result: result.data,
          currentPage : data.currentPage,
          perPage: data.perPage
        })
      }
      catch (err) {
        console.log(err);
      }
    }, // get all user for manager 
    async deleteUser ({commit}, data) {
      try {
        let result = await usersAPI.deleteUser(data)
        commit('getAllUsers' , {
          result: result.data,
          currentPage : data.currentPage,
          perPage: data.perPage
        })
      }
      catch (err) {
        console.log(err);
      }
    }, // get all user for manager 
  }
  
})