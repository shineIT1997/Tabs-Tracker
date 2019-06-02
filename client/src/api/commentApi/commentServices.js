import api from '../index'

const  newComment = (credentials) => {
    return api().post('newComment', credentials)
}
const  show = (credentials) => {
    return api().post('show', {commentID: credentials})
}
const  getCommentForSong = (credentials) => {
    return api().post('getCommentForSong', credentials)
}
const  replyComment = (credentials) => {
    console.log(credentials);
    return api().post('replyComment', credentials)
}
const  getNewComments = (credentials) => {
    console.log(credentials);
    return api().post('getNewComments', credentials)
}

export default {
    newComment,
    show,
    getCommentForSong,
    replyComment,
    getNewComments
}