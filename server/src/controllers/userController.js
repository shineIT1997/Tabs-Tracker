const User = require('../models/user/user')
const Comment = require('../models/comment/comment')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

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
                        console.log(response);
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
                    console.log(response);
                        
                    if(response) {

                        let userJson = result._id.toJSON()
                        return res.status(203).send({
                            mess: 'Login success',
                            user: jwtSignUse(userJson)
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
            .then(result => {
                console.log(result);
                let userJson = result.toJSON()
                return res.status(203).send({
                    user: userJson
                })
            })
            .catch(err => {
                console.log(err);
            })
        });
    },
    editUser (req , res) {
        let info = req.body.credentials
        let edit = {}
        for(let key in info.update) {
            if(info.update[key]) {
                edit[key] = info.update[key]
            }
        }      
        jwt.verify(info.id, config.authentication.jwtSecret , function(err, decoded) {         
            User.findByIdAndUpdate(decoded, edit)
            .then(result => {
                return res.status(200).send({
                    mess: 'Update thanh cong'
                })
            })
            .catch(err => {
                return res.status(200).send({
                    mess: err.errmsg
                })
            })
        });
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
            console.log(decoded);
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
                        console.log(s);
                        result.splice(s , 1)
                    }
                }
                return res.status(200).send(result)
            })
            .catch(err => {
                console.log(err);
            })
        })
        console.log(req.body);
    }
}