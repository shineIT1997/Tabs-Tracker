const  mongoose = require('mongoose')
const Schema = mongoose.Schema
const {schema , options} = require('./schema')

const songSchema = new Schema(schema , options)

module.exports = mongoose.model('songs' , songSchema)