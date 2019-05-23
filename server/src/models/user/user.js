const  mongoose = require('mongoose')
const Schema = mongoose.Schema
const {users , options} = require('./schema')

const songSchema = new Schema(users , options)

module.exports = mongoose.model('users' , songSchema)