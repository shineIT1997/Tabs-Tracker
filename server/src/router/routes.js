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
// user router




    app.post('/createSong', 
        upload.single('file'),
        songControllers.create
    )
    app.post('/getPopularSong', 
        songControllers.getPopularSong
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