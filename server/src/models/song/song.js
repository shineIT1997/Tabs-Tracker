const  mongoose = require('mongoose')
const Schema = mongoose.Schema
const {song , options} = require('./schema')

const songSchema = new Schema(song , options)

module.exports = mongoose.model('songs' , songSchema)