const mongoose = require('mongoose')

const FollowSchema = new mongoose.Schema({
    userName: String,
    parentTwitchID: String,
    twitchID: String,
    folder: String,
    notes: String,
    lastRaided: String,
})

module.exports = mongoose.model('Follow', FollowSchema)