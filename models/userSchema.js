const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    "googleID": String,
    "username": String,
    "name": String
});

const User = mongoose.model('User', userSchema);

module.exports = User;