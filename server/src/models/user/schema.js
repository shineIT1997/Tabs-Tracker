const mongoose = require('mongoose');
const Schema = mongoose.Schema


const users = {
    email: {
        type: String,
        unique: 'Email already exists',
        required: 'Please enter email!'
    },
    usersName: {
        type: String,
        unique: 'userName already exists',
        required: 'Please enter username'
    },
    password: {
        type: String,
        required: 'Please enter password!'
    },
    avatar: {
        type: String,
    },
    jurisdiction: {
        type: String,
        required: 'Please enter jurisdiction',
        default: 'user'
    },
    favorites: [
        {
            type: Schema.Types.ObjectId ,
            ref: 'songs'
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId ,
            ref: 'songs'
        }
    ],
    songs: [
        {
            type: Schema.Types.ObjectId ,
            ref: 'songs'
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ]
}


const options ={
    collection: 'users',
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}

module.exports = {
    users ,
    options
}