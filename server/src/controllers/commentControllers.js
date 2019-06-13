const Song = require('../models/song/song')
const User = require('../models/user/user')
const Comment = require('../models/comment/comment')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')


module.exports = {
    async newComment (req , res) {
        let info = req.body
        if(!info.userID) {
            newComment.guest = true
        }
        let newComment = {}
        await jwt.verify(info.userID, config.authentication.jwtSecret , function(err, decoded) {         
            info.userID = decoded 
            console.log(info);
            Song.findById(info.songID)
            .then(result => {
                console.log(result);
                if (info.userID == result.userID) {
                    info.show = true
                }
                for(let key in info) {
                    if(info[key]) {
                        newComment[key] = info[key]
                    }
                }
                let creComment = new Comment(newComment)
                creComment.save()
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                })
            })
            .catch(err => {
                console.log(err);
            })
        });
    },
    async show (req , res) {
        console.log(req.body.commentID);
        let ID = req.body.commentID
        Comment.findByIdAndUpdate(ID , { $set: { show: true }})
        .then(result => {
            console.log(result);
            return res.status(200).send({
                mess: 'đã duyệt'
            })
        })
    },

    async getCommentForSong (req , res) {
        console.log(req.body);
        Comment.find({ $and: [ { songID: req.body.songID}, { show: true}]})
        .populate({ path: 'userID' , select: 'usersName'})
        .populate({ path: 'reply', 
                    options: {$sort: {createdAt : 1}},
                    populate: { path: 'userID',
                                select: 'usersName'
                    }
        })
        .sort({createdAt : -1})
        .then(result => {
            console.log(result);
            return res.status(200).send(result)
        })
    },
    async getNewComments (req , res) {
        console.log('hellocommnet');
        
    },
    async replyComment (req , res) {
        console.log(req.body);
        let info = req.body.info
        let replyID = req.body.replyID
        let repComment = {
            root: false
        }
        if(!info.userID) {
            repComment.guest = true
        }
        Comment.findById(replyID).then(async result => {
            console.log({findcommet: result});
            if(result) {
                await jwt.verify(info.userID, config.authentication.jwtSecret , function(err, decoded) {         
                    info.userID = decoded 
                });
                let song = await Song.findById(info.songID)
                console.log({findSong: song});
                if (info.userID == song.userID) {
                        info.show = true
                }
                console.log({song: song});
                for(let key in info) {
                    if(info[key]) {
                        repComment[key] =  info[key]
                    }
                }
                console.log({info: info});     
                let creComment = new Comment(repComment)
                let cmt = await creComment.save()
                if(cmt) {
                    console.log(cmt);
                    let update = await Comment.update(
                        { _id: replyID },
                        { $push: { reply: cmt._id } }
                    )
                    console.log({update: update});
                    if (update) {
                    }
                }
                // Song.findById(info.songID)
                // .then(song => {
                //     if(song) {
                //         console.log(song);
                //         if (info.userID == song.userID) {
                //             info.show = true
                //         }
                //         for(let key in info) {
                //             if(info[key]) {
                //                 repComment[key] = info[key]
                //             }
                //         }
                //         console.log(repComment);
                        
                //         let creComment = new Comment(repComment)
                //         creComment.save()
                //         .then(cmt => {
                //             console.log(cmt);
                //             Comment.update(
                //                 { _id: replyID },
                //                 { $push: { reply: cmt._id } }
                //             )
                //             .then
                //         })
                //         .catch(err => {
                //             console.log(err);
                //         }) 
                //     }
                // })
                // .catch(err => {
                //     console.log(err);
                // })
            }
        })

    }
}