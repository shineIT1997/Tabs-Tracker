const  mongoose = require('mongoose')
const Schema = mongoose.Schema
const {comment , options} = require('./schema')

const songSchema = new Schema(comment , options)

module.exports = mongoose.model('comments' , songSchema)