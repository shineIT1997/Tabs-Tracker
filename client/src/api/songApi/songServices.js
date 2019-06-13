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
const  getSongList = (credentials) => {
    return api().post('getSongList' , credentials)
}
const  getDetailSong = (credentials) => {
    return api().post('getDetailSong' ,credentials)
}
const  deleteSong = (credentials) => {
    return api().post('deleteSong' ,credentials)
}
const  findSong = (credentials) => {
    return api().get('findSong' , {
        params: {
            search: credentials
        }
    })
}
const  rating = (credentials) => {
    return api().post('rating' , credentials)
}
const  testselect = (credentials) => {
    return api().post('testselect' , credentials)
}
const  checkLove = (credentials) => {
    return api().post('checkLove' , credentials)
}
export default {
    createSong,
    getPopularSong,
    getDetailSong,
    findSong,
    deleteSong,
    editSong,
    getNewSong,
    rating,
    checkLove,
    getSongList,
    testselect
}