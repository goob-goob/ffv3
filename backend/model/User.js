const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName: String,
    twitchID: String,

})

module.exports = mongoose.model('User', UserSchema)