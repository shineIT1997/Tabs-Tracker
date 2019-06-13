const userControllers = require('../controllers/userController')
const songControllers = require('../controllers/songControllers')
const commentControllers = require('../controllers/commentControllers')
const multer  = require('multer')


const storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, '../img')
     },
     filename: function (req, file, cb) {
       cb(null, file.fieldname + '-' + Date.now())
     }
   })
   
const upload = multer({ storage: storage })



module.exports = (app) => {
    app.get('/' , 
        function(req,res) {
            res.send('hello')
        }
    )
    app.post('/getUser', 
    userControllers.getUser
    )
    app.post('/register' , 
        userControllers.register
    )
    app.post('/editUser' , 
        upload.single('file'),
        userControllers.editUser
    )
    app.post('/login' , 
        userControllers.login
    )
    app.post('/getSongOfUser' , 
        userControllers.getSongOfUser
    )
    app.post('/getComments' , 
        userControllers.getComments
    )
    app.post('/user/bookmark' , 
        userControllers.bookmark
    )
    app.post('/user/follow' , 
        userControllers.follow
    )
    app.post('/user/checkBookmark' , 
        userControllers.checkBookmark
    )
    app.post('/user/checkFollow' , 
        userControllers.checkFollow
    )
    app.post('/user/getBookmark' , 
        userControllers.getBookmark
    )
    app.post('/user/getFollowingForHome' , 
        userControllers.getFollowingForHome
    )
    app.post('/user/getAllUsers' , 
        userControllers.getAllUsers
    )
    app.post('/user/deleteUser' , 
        userControllers.deleteUser
    )
    // app.post('/user/getFollowing' , 
    //     userControllers.getFollowing
    // )
// user router




    app.post('/createSong', 
        upload.single('file'),
        songControllers.create
    )
    app.post('/getPopularSong', 
        songControllers.getPopularSong
    )
    app.post('/getSongList', 
        songControllers.getSongList
    )
    app.post('/getNewSong', 
        songControllers.getNewSong
    )
    app.post('/getDetailSong', 
        songControllers.getDetailSong
    )
    app.get('/findSong', 
        songControllers.findSong
    )
    app.post('/deleteSong', 
        songControllers.deleteSong
    )
    app.post('/editSong', 
        upload.single(), //dùng formData phải gọi single
        songControllers.editSong
    )
    app.post('/rating', 
        songControllers.rating
    )
    app.post('/checkLove', 
        songControllers.checkLove
    )
    app.post('/testselect', 
        upload.single(),
        songControllers.testselect
    )

// song router
    

    app.post('/newComment', 
    commentControllers.newComment
    )
    app.post('/show', 
    commentControllers.show
    )
    app.post('/getCommentForSong', 
    commentControllers.getCommentForSong
    )
    app.post('/replyComment', 
    commentControllers.replyComment
    )
    app.post('/getNewComments', 
    commentControllers.getNewComments
    )
// commet router
}