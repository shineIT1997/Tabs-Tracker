const mongoose = require('mongoose');
const Schema = mongoose.Schema

const song = {
    title: {
        type: String,
        required: 'Please enter title!'
    },
    artist: {
        type: String,
        required: 'Please enter artist!'
    },
    album: {
        type: String,
        default: 'unknown'
    },
    imgAlbum: {
        type: String,
    },
    idYoutube: {
        type: String,
        required: 'Please enter idYoutube!'
    },
    lyricsAndTabs: {
        type: String,
        required: 'Please enter lyricsAndTabs!'
    },
    userID: {
        type: Schema.Types.ObjectId ,
        ref: 'users'
    }
}


const options ={
    collection: 'songs',
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}

module.exports = {
    song ,
    options
}