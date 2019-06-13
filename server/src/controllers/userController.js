const User = require('../models/user/user')
const Comment = require('../models/comment/comment')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const fs = require('fs')

function jwtSignUse (user) {
    var tokenFeedback = jwt.sign(user , config.authentication.jwtSecret , {algorithm: 'HS256'})
    return tokenFeedback
} // make a token to send to client 
module.exports = {
    register (req , res) {
        let userRegister = req.body.credentials
        User.findOne({ $or: [ { usersName:  userRegister.username}, { email: userRegister.email } ] })
        .then((result) => {
            if(result) {
                return res.status(403).send({
                    mess: 'Email used'
                })
            }
            bcrypt.genSalt(10 ,  function (err , salt) {
                bcrypt.hash(userRegister.password , salt , function(err , hash) {
                    user = new User({
                        email: userRegister.email,
                        password: hash,
                        usersName: userRegister.username,
                    })
                    user.save()
                    .then(response => {
                        if(response) {
                            let userJson = response._id.toJSON()
                            return res.status(203).send({
                                mess: 'register success',
                                user: {
                                    token: jwtSignUse(userJson),
                                    userName: response.usersName,
                                    jurisdiction: response.jurisdiction
                                }
                            })
                        }
                        else {
                            return res.status(500)
                        }
                    })
                    .catch(error => {
                        console.log(`error ${error}`);
                    })
                })
            })
        }) //encode password
        .catch (err => {
            console.log(err);
        })
    }, // register a user

    login (req , res) {
        console.log(req.body);
        let userLogin = req.body.credentials
        User.findOne( {$or: [{ usersName:  userLogin.username }, { email: userLogin.username } ] } )
        .then((result) => {
            if(result) {
                console.log(result._id);
                console.log(userLogin.password);
                bcrypt.compare(userLogin.password, result.password, function(err, response) {
                    if(response) {
                        let userJson = result._id.toJSON()
                        return res.status(203).send({
                            mess: 'Login success',
                            user: {
                                token: jwtSignUse(userJson),
                                userName: result.usersName,
                                jurisdiction: result.jurisdiction
                            }
                            
                        })
                    }
                    else {
                        return res.status(403).send({
                            mess : 'Password was incorrect'
                        })                       
                    }
                }); 
            }
            else {
                return res.status(403).send({
                    mess : 'the login information was incorrect'
                })  
            }
        })
        .catch(err => {
            console.log(err);
        })
    },
    getUser (req , res) {
        jwt.verify(req.body.credentials, config.authentication.jwtSecret , function(err, decoded) {
            User.findById(decoded)
            .then(async result => {
                console.log(result);
                
                if(fs.existsSync(result.avatar)) { 
                    let img = await fs.readFileSync(result.avatar)
                    let encoding_img = await img.toString('base64')
                    result.avatar = await 'data:image/jpeg;base64,'.concat(encoding_img)
                }
                else {
                    result.avatar = ''
                }
                return res.status(200).send({
                    result: result
                })
            })
            .catch(err => {
                console.log(err);
            })
        });
    },
    async editUser (req , res) {
        try {
            let info = req.body
            let edit = {}
            edit['avatar'] = req.file.path 
            for(let key in info.update) {
                if(info.update[key]) {
                    edit[key] = info.update[key]
                }
            }      
            await jwt.verify(info.id, config.authentication.jwtSecret , function(err, decoded) {         
                User.findByIdAndUpdate(decoded, edit)
                .then(result => {
                    if(result) {
                        User.findById(decoded)
                        .then( async response => {
                            if(fs.existsSync(response.avatar)) { 
                                let img = await fs.readFileSync(response.avatar)
                                let encoding_img = await img.toString('base64')
                                response.avatar = await 'data:image/jpeg;base64,'.concat(encoding_img)
                            }
                            else {
                                response.avatar = ''
                            }
                            console.log(response);
                            
                            return res.status(200).send({
                                mess: 'Update thanh cong',
                                result: response
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    }
                })
                .catch(err => {
                    return res.status(200).send({
                        mess: err.errmsg
                    })
                })
            });
        }
        catch {

        }
    },
    getSongOfUser (req , res) {
        let userID = req.body.userID
        jwt.verify(userID, config.authentication.jwtSecret , function(err, decoded) {         
          User.findById(decoded)
          .populate('songs')
          .then(result => {
              res.status(200).send( result.songs )
          })
          .catch(err => {
              console.log(err);
          })
        });
    },
    getComments (req , res) {
        let userID = req.body.userID
        jwt.verify(userID, config.authentication.jwtSecret , function(err, decoded) { 
            Comment.find({ show: false }) //{ $and: [ { userID: decoded },  ] }
            .populate({
                path: 'songID',
            })
            .populate({
                path: 'userID',
            })
            .sort({ createdAt : -1})
            .then(result => {
                for(s in result) {
                    if(result[s].songID.userID != decoded) {
                        result.splice(s , 1)
                    }
                }
                return res.status(200).send(result)
            })
            .catch(err => {
                return res.status(500).send(err)
            })
        })
    },
    follow (req , res) {
        jwt.verify(req.body.userID, config.authentication.jwtSecret , function(err, decoded) { 
            User.findById(decoded)
            .then(result => {
              if(decoded == req.body.followID ) {
                return res.status(200).send({
                    checkFollow: result.following,
                    mess : 'Đếch follow bản thân mình dc nhá :)'
                })
              }
              if(result.following.indexOf(req.body.followID) !== -1) {
                User.findByIdAndUpdate(
                    decoded ,
                    { $pull:
                       {
                        following : req.body.followID
                       }
                    }
                 )
                 .then(removeFollow => {
                   if(removeFollow) {
                    User.findById(decoded)
                    .then(response =>  {
                        console.log(response.following);
                        return res.status(200).send({
                            checkFollow: response.following
                        })
                    })
                    .catch(err => {
                        return res.status(500).send(err)
                    })
                   }
                 })
                 .catch(err => {
                    return res.status(500).send(err)
                 })
              }
              else {
                User.findByIdAndUpdate(
                    decoded ,
                    { $push:
                       {
                        following : req.body.followID
                       }
                    }
                 )
                 .then(updateFollow => {
                   if(updateFollow) {
                    User.findById(decoded)
                    .then(response =>  {
                        return res.status(200).send({
                            checkFollow: response.following
                        })
                    })
                    .catch(err => {
                        return res.status(500).send(err)
                    })
                   }
                 })
                 .catch(err => {
                    return res.status(500).send(err)
                 })
              }
            })
            .catch(err => {
                return res.status(500).send(err)
            })
        })
    },
    bookmark (req , res) {
        jwt.verify(req.body.userID, config.authentication.jwtSecret , function(err, decoded) { 
            User.findById(decoded)
            .then(result => {
              if(result.bookmarks.indexOf(req.body.songID) !== -1) {
                User.findByIdAndUpdate(
                    decoded ,
                    { $pull:
                       {
                        bookmarks : req.body.songID
                       }
                    }
                 )
                 .then(removeBookmark => {
                   if(removeBookmark) {
                    User.findById(decoded)
                    .then(response =>  {
                        return res.status(200).send({
                            checkBookmark: response.bookmarks
                        })
                    })
                    .catch(err => {
                        return res.status(500).send(err)
                    })
                   }
                 })
                 .catch(err => {
                    return res.status(500).send(err)
                 })
              }
              else {
                User.findByIdAndUpdate(
                    decoded ,
                    { $push:
                       {
                        bookmarks : req.body.songID
                       }
                    }
                 )
                 .then(updateBookmark => {
                   if(updateBookmark) {
                    User.findById(decoded)
                    .then(response =>  {
                        return res.status(200).send({
                            checkBookmark: response.bookmarks
                        })
                    })
                    .catch(err => {
                        return res.status(500).send(err)
                    })
                   }
                 })
                 .catch(err => {
                    return res.status(500).send(err)
                 })
              }
            })
            .catch(err => {
                return res.status(500).send(err)
            })
        })
    },
    checkBookmark (req , res ) {
        jwt.verify(req.body.userID, config.authentication.jwtSecret , function(err, decoded) { 
            User.findById({_id : decoded })
            .then(result => {
                return res.status(200).send({
                    checkBookmark: result.bookmarks
                })
            })
            .catch(err => {
                return res.status(500).send(err)
            })
        })
    },
    checkFollow (req , res ) {
        jwt.verify(req.body.userID, config.authentication.jwtSecret , function(err, decoded) { 
            User.findById({_id : decoded })
            .then(result => {
                return res.status(200).send({
                    checkFollow: result.following
                })
            })
            .catch(err => {
                return res.status(500).send(err)
            })
        })
    },
    async getBookmark (req , res ) {
        try {
            await jwt.verify(req.body.userID, config.authentication.jwtSecret , function(err, decoded) { 
                User.findById(decoded)
                .populate({
                    path: 'bookmarks',
                    populate: {
                        path: 'userID',
                        select: 'usersName  avatar'
                    } 
                })
                .then(async result => {
                    for (let index = 0; index < result.bookmarks.length; index++) {
                        console.log(result.bookmarks[index]);
                        
                        if(fs.existsSync(result.bookmarks[index].avatar)) { 
                            let img = await fs.readFileSync(result.bookmarks[index].avatar)
                            let encoding_img = await img.toString('base64')
                            result.bookmarks[index].avatar = await 'data:image/jpeg;base64,'.concat(encoding_img)
                        }
                        else {
                            result.bookmarks[index].avatar = ''
                        }
                        
                    }
    
                    return res.status(200).send(result.bookmarks)
                })
                .catch(err => {
                    return res.status(500).send(err)
                })
            })
        } catch (error) {
            
        }

    },
    getFollowing (req , res ) {
        console.log(req.body);
        jwt.verify(req.body.userID, config.authentication.jwtSecret , function(err, decoded) { 
            console.log(decoded);
            User.findById(
                decoded
            )
            .populate({
                path: 'following',
                // Get friends of friends - populate the 'friends' array for every friend
                populate: { path: 'songs' ,
                            options: {
                                sort: {
                                    createdAt: -1,
                                },
                                limit: 1
                            }},
            })
            .then(result => {
                let arr = [...Array()]
                let a = 0 //var loop to push value into arr
                for (let index = 0; index < result.following.length; index++) {
                    if(result.following[index].songs[0]) {
                        arr[a] = result.following[index].songs[0].title
                        a += 1
                    }
                }
                console.log(arr);
                
            })
        })
    },
    getFollowingForHome (req , res ) {
        console.log(req.body);
        jwt.verify(req.body.userID, config.authentication.jwtSecret , function(err, decoded) { 
            console.log(decoded);
            user = User.findById(decoded)
            .populate({
                path: 'following',
                populate: {
                    path: 'songs',
                    options: {
                        sort: {
                            createdAt: -1
                        },
                        limit: 1
                    }
                }
            })
            .then( async result => {
                for (let index = 0; index < result.following.length; index++) {
                    if(fs.existsSync(result.following[index].avatar)) { 
                        let img = await fs.readFileSync(result.following[index].avatar)
                        let encoding_img = await img.toString('base64')
                        result.following[index].avatar = await 'data:image/jpeg;base64,'.concat(encoding_img)
                    }
                    else {
                        result.following[index].avatar = ''
                    }
                }
                console.log( result.following);
                
                return res.status(200).send({
                    following : await result.following
                })
            })
            .catch (err => {
                return res.status(500).send(err)
            })
        })
    },
    getAllUsers (req , res) {
        console.log(req.body);
        
        jwt.verify(req.body.data.token, config.authentication.jwtSecret , async function(err, decoded) { 
            let user = await User.findById(decoded)
            if(user.jurisdiction === 'admin') {
                return res.status(200).send(await User.find()) 
            }
            else res.status(500).send(err)
        })
    },
    deleteUser (req , res) {
        console.log(req.body);
        jwt.verify(req.body.token, config.authentication.jwtSecret , async function(err, decoded) { 
            let user = await User.findById(decoded)
            let deletedUser = await User.findById(req.body.deleteID)
            if(user.jurisdiction === 'admin' && decoded !== req.body.deleteID && deletedUser.jurisdiction !== 'admin') {
               await User.findByIdAndDelete(req.body.deleteID)
                return res.status(200).send(await User.find()) 
            }
            else res.status(500).send(err)
        })
    }
}