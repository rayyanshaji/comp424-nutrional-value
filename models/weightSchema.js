const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weightSchema = new Schema({
    "username": String,
    "date": Date,
    "weight": Number,
    "units": String 
});

const Weight = mongoose.model('Weight', weightSchema);

module.exports = Weight;