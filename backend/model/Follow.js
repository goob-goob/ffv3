const mongoose = require('mongoose')

const FollowSchema = new mongoose.Schema({
    userName: String,
    parentTwitchID: String,
    twitchID: String,
    thumbnail: String,
    folder: String,
    game: String,
    title: String, 
    notes: String,
    lastRaided: String,
    isLive: Boolean,
})

module.exports = mongoose.model('Follow', FollowSchema)