const Song = require('../models/song/song')
const User = require('../models/user/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const fs = require('fs')

async function  jwtSignUse (user) {
    return await jwt.sign(user , config.authentication.jwtSecret , {algorithm: 'HS256'})

}
module.exports = {
    async create (req , res) {
        try {
            let info = req.body
            let edit = {} //set vả to save in song-model
            if (req.file) {
                edit['imgAlbum'] = req.file.path
            }
            await jwt.verify(info.userID, config.authentication.jwtSecret , function(err, decoded) {         
                info.userID = decoded
                console.log(info.userID);
                for(let key in info) {
                    if(info[key]) {
                        edit[key] = info[key]
                    }
                }
            });
            newSong = await new Song(edit)
            newSong.save()
            .then(response => {
                User.findByIdAndUpdate(response.userID, {
                    $push: {songs: response._id}
                })
                .then(result => {
                    console.log(result);
                    
                    return res.status(200).send({
                        mess: 'Create success'
                    })
                })
                .catch(err => {
                    return res.status(500).send({
                        mess: 'Something wrong'
                    })
                })
            })
            .catch(error => {
                console.log(`error ${error}`);
                return res.status(500).send({
                    mess: 'Something wrong'
                })
            })
        }
        catch (err) {
            console.log(err);
        }
    },
    async getPopularSong (req , res) {
        try {
            Song.find()
            .populate({
                path: 'userID',
                select: 'usersName'
            })
            .sort({ rating : -1 })
            .limit(20)
            .then(async result => { 
                let acb = result              
                for (let index in acb) {
                    acb[index].idUser = await jwtSignUse(acb[index].userID.id)
                    if(fs.existsSync(acb[index].imgAlbum)) { 
                        let img = await fs.readFileSync(acb[index].imgAlbum)
                        let encoding_img = await img.toString('base64')
                        acb[index].imgAlbum = 'data:image/jpeg;base64,'.concat(encoding_img)
                    }
                    else {
                        acb[index].imgAlbum = ''

                    }
                }
                console.log(acb);
                res.status(200).send(acb)
                
            })
            .catch(err => {
                console.log(err);
            })
        }
        catch {

        }
    },
    async getNewSong (req , res) {
        try {
            Song.find()
            .sort({ createdAt : -1 })
            .limit(5)
            .then(result => {
                return res.status(200).send(result)
            })
            .catch(err => {
                console.log(err);
            })
        }
        catch {

        }
    },
    async getDetailSong (req , res) {
        try {
            console.log(req.body.songID);
            
            Song.findById(req.body.songID)
            .then( async result => {
                if(result) {
                    result.userID = await jwtSignUse(result.userID)
                    return res.status(200).send(result)
                }
                else {
                    return res.status(500).send()
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
        catch {
        }
    },
    async findSong (req , res) {
        try {
            console.log(req.query);
            let search = req.query.search
            console.log(typeof search);
            Song.find({ 
                $or: [ 
                    { title: {$regex: search , $options: 'i'}}, 
                    { artist: {$regex: search , $options: 'i'}}, 
                    { album: {$regex: search , $options: 'i'}} 
            ]}) 
            .then(async result => {
                for(let key in result) {
                    result[key].userID = await jwtSignUse(result[key].userID) 
                }
                return res.status(200).send(result)
            })
            .catch(err => {
                console.log(err);
            })
        }
        catch {
            res.status(500).send({
                mess: 'bad gate'
            })
        }
    },
    async deleteSong (req , res) {
        try {
            console.log(req.body);
            let userID = req.body.user
            let songID = req.body.song
            jwt.verify(userID, config.authentication.jwtSecret , function(err, decoded) {         
                User.findByIdAndUpdate(decoded, { $pull: { songs: songID  } })
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    return res.status(200).send({
                        mess: err.errmsg
                    })
                })
                Song.findByIdAndDelete(songID) 
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                })
            });
        }
        catch {

        }
    },
    async checkLove (req , res) {
        try {
            let userID = req.body.data
            if (userID) {
                jwt.verify(userID, config.authentication.jwtSecret , function(err, decoded) {         
                    User.findById(decoded)
                    .then(result => {
                        if (result) {
                            return res.status(200).send({
                                checkFavorites: result.favorites
                            })
                        }
                    })  
                })           
            }      
        }
        catch (err) {
            console.log(err);
        }
    },
    async rating (req , res) {
        try {
            console.log(req.body);
            let userID =req.body.userID
            let songID =req.body.songID
            if (userID) {
                jwt.verify(userID, config.authentication.jwtSecret , function(err, decoded) {         
                    User.findById(decoded)
                    .then(async result => {
                        if(result.favorites.indexOf(songID) !== -1) {
                            let song = await Song.findById(songID)
                            if (song) {
                                song.rating -=1
                                let save = await song.save()
                            }
                            User.findByIdAndUpdate(
                                decoded ,
                                { $pull:
                                   {
                                    favorites : songID
                                   }
                                }
                             )
                             .then(removeFavorites => {
                               if(removeFavorites) {
                                User.findById(decoded)
                                .then(response =>  {
                                    return res.status(200).send({
                                        checkFavorites: response.favorites
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
                            let song = await Song.findById(songID)
                            if (song) {
                                song.rating +=1
                                let save = await song.save()
                            }
                            User.findByIdAndUpdate(
                                decoded ,
                                { $push:
                                   {
                                    favorites : songID
                                   }
                                }
                             )
                             .then(updateFavorites => {
                               if(updateFavorites) {
                                User.findById(decoded)
                                .then(response =>  {
                                    return res.status(200).send({
                                        checkFavorites: response.favorites
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
                        return res.status(200).send({
                            mess: err.errmsg
                        })
                    })
                });
            }
            else {
                let song = await Song.findById(songID)
                if (song) {
                    song.rating +=1
                    let save = await song.save()
                    console.log(save);
                }
            }      
        }
        catch (err) {
            console.log(err);
        }
    },
    async editSong (req , res) {
        try {
            console.log(req.body);
            // let info = req.body
            // let edit = {}
            // for(let key in info.update) {
            //     if(info.update[key]) {
            //         edit[key] = info.update[key]
            //     }
            // } 
            // console.log(edit);
                         
            // Song.findByIdAndUpdate(edit._id, edit)
            // .then(result => {
            //     return res.status(200).send({
            //         mess: 'Update thanh cong'
            //     })
            // })
            // .catch(err => {
            //     return res.status(200).send({
            //         mess: err.errmsg
            //     })
            // })
        }
        catch {

        }
    },
    async getSongList (req , res) {
        try {
            if(req.body.rule === 'TopRate') {
                Song.find()
                .populate({
                    path: 'userID',
                    select: 'usersName'
                })
                .sort({ rating : -1 })
                .then(result => {
                    return res.status(200).send(result)
                })
            }
            else if (req.body.rule === 'NewSong') {
                Song.find()
                .populate({
                    path: 'userID',
                    select: 'usersName'
                })
                .sort({ createdAt : -1 })
                .then(result => {
                    return res.status(200).send(result)
                })
            }
        } catch (error) {
            return res.status(500).send(error)
        }

    },
    async testselect (req , res) {
        console.log(req);
    }
}