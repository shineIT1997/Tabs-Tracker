import api from '../index'
const  register = (credentials) => {
  return api().get('register' , credentials)
}
export default {
    register,
}