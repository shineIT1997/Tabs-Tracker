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
  return api().post('editUser', {credentials})
}
const getSongOfUser = (userID) => {
  return api().post('getSongOfUser', {userID})
}
const getComments = (userID) => {
  return api().post('getComments', userID)
}
export default {
  register,
  login,
  getUser,
  editUser,
  getSongOfUser,
  getComments
}