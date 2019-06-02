const mongoose = require('mongoose');
const Schema = mongoose.Schema

const comment = {
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    songID: {
        type: Schema.Types.ObjectId,
        ref: 'songs',
        required: 'Please enter SongsID'
    },
    content: {
        type: String,
        required: 'Please enter content!'
    },
    root: {
        type: Boolean,
        default: true
    },
    show: {
        type: Boolean,
        default: false
    },
    reply: [
        {
            type: Schema.Types.ObjectId ,
            ref: 'comments'
        }
    ]
}


const options ={
    collection: 'comments',
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}

module.exports = {
    comment ,
    options
}