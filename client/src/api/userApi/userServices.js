import api from '../index'
const register = (credentials) => {
  return api().post('register', {credentials})
}
const login = (credentials) => {
  return api().post('login', {credentials})
}
const getUser = (credentials) => {
  return api().post('getUser', {credentials})
}
const editUser = (credentials) => {
  return api().post('editUser', credentials)
}
const getSongOfUser = (userID) => {
  return api().post('getSongOfUser', {userID})
}
const getComments = (userID) => {
  return api().post('getComments', userID)
}
const bookmark = (data) => {
  return api().post('/user/bookmark', data)
}
const follow = (data) => {
  return api().post('/user/follow', data)
}
const checkBookmark = (data) => {
  return api().post('/user/checkBookmark', data)
}
const checkFollow = (data) => {
  return api().post('/user/checkFollow', data)
}
const getBookmark = (data) => {
  return api().post('/user/getBookmark', data)
}
        
const getFollowing = (data) => {
  return api().post('/user/getFollowing', data)
}
const getFollowingForHome = (data) => {
  return api().post('/user/getFollowingForHome', data)
}
const getAllUsers = (data) => {
  return api().post('/user/getAllUsers', data)
}
const deleteUser = (data) => {
  return api().post('/user/deleteUser', data)
}
export default {
  register,
  login,
  getUser,
  editUser,
  getSongOfUser,
  getComments,
  bookmark,
  checkBookmark,
  getBookmark,
  getFollowing,
  checkFollow,
  follow,
  getFollowingForHome,
  getAllUsers,
  deleteUser
}