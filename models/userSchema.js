const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    "dateCreated": Date,
    "isSetup": { type: Boolean, default: false },
    "provider": String,
    "providerID": String,
    // "username": String,
    "name": String
});

const User = mongoose.model('User', userSchema);

module.exports = User;