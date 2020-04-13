const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    dateCreated: { type: Date, default: Date.now },
    provider: String,
    providerID: String,
    name: String
});

var User =  mongoose.model('User', UserSchema);

module.exports = User