import api from '../index'

const  createSong = (credentials) => {
    return api().post('createSong', credentials)
}
const  editSong = (credentials) => {
    return api().post('editSong', credentials)
}
const  getPopularSong = () => {
    return api().post('getPopularSong')
}
const  getNewSong = () => {
    return api().post('getNewSong')
}
const  getDetailSong = (credentials) => {
    return api().post('getDetailSong' ,credentials)
}
const  deleteSong = (credentials) => {
    return api().post('deleteSong' ,credentials)
}
const  findSong = (credentials) => {
    console.log(credentials);
    return api().get('findSong' , {
        params: {
            search: credentials
        }
    })
}
export default {
    createSong,
    getPopularSong,
    getDetailSong,
    findSong,
    deleteSong,
    editSong,
    getNewSong
}