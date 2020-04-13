const mongoose = require('mongoose');
const DaySchema = require('./day');

const UserSchema = mongoose.Schema({
    dateCreated: { type: Date, default: Date.now },
    provider: String,
    providerID: String,
    name: String,
    food_log: [DaySchema.schema]
});

var User =  mongoose.model('User', UserSchema);;

module.exports = User