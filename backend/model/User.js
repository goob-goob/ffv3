const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName: String,
    twitchID: String,
    accessToken: String,
    refreshToken: String,
    tokenExpiration: Date,

})

module.exports = mongoose.model('User', UserSchema)