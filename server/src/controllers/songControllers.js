const Song = require('../models/song/song')
const User = require('../models/user/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const fs = require('fs')

function jwtSignUse (user) {
    var tokenFeedback = jwt.sign(user , config.authentication.jwtSecret , {algorithm: 'HS256'})
    return tokenFeedback
}
module.exports = {
    async create (req , res) {
        try {
            console.log(req.body);
            // console.log(req.file.path)
            let info = req.body
            let edit = {} //set vả to save in song-model
            edit['imgAlbum'] = req.file.path
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
        catch {

        }
    },
    async getPopularSong (req , res) {
        try {
            Song.find()
            .sort({ rating : -1 })
            .limit(20)
            .then(async result => {
                console.log(result);
                for (let index in result) {
                    if(fs.existsSync(result[index].imgAlbum)) {
                        console.log(typeof result[index].imgAlbum);
                        let img = await fs.readFileSync(result[index].imgAlbum)  
                        let encoding_img = await img.toString('base64')
                        result[index].imgAlbum = 'data:image/jpeg;base64,'.concat(encoding_img)
                    }
                    else {
                        result[index].imgAlbum = ''
                    }
                }
                return res.status(200).send(result)
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
            });
        }
        catch {

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
    }
}