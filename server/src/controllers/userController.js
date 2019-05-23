const User = require('../models/user/user')
const bcrypt = require('bcrypt')

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
                bcrypt.hash(userRegister.username , salt , function(err , hash) {
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
                console.log(result.password);
                console.log(userLogin.password);
                bcrypt.compare(userLogin.password, result.password, function(err, response) {
                    if(response) {
                        return res.status(203).send({
                            mess : 'Login success',
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
    }
    // async login  (req , res)  {
    //     // var afds = jwt.sign({user: 'paduvi'},config.authentication.jwtSecret , {algorithm: 'HS256'})
    //     // console.log(`ffdfs ${afds}`)
    //     try {
    //         let userLogin = req.body.credentials
    //         let checkEmail = await User.findOne({ $or: [ { usersName:  userLogin.username}, { email: userLogin.username } ] }) 
            
    //         if (!checkEmail) {
    //             return res.status(403).send({
    //                 mess : 'the login information was incorrect'
    //             })
    //         }
    // //     var tokenFeedback = jwt.sign({user: 'paduvi'},config.authentication.jwtSecret , {algorithm: 'HS256'})
    //         bcrypt.compare(userLogin.password , checkEmail.password,  function(err, response) {
    //             if(response) {
    //                 console.log(response);
    //                 // let userJson = checkEmail.toJSON()
    //                 // return res.status(203).send({
    //                 //     mess : 'Login success',
    //                 //     user: userJson,
    //                 // })
    //             }
    //             else {
    //                 return res.status(403).send({
    //                     mess : 'Password was incorrect'
    //                 })
    //             }
    //         });

    //     }
    //     catch(err) {
    //         console.log(err);
            
    //         res.status(500).send({
    //             error: 'invalid login information'
    //         })
    //     }
    // }
}