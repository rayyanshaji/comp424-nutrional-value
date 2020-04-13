const mongoose = require('mongoose');
const ItemSchema = require('./item').schema;

const DaySchema = mongoose.Schema({
    date: Date,
    items: [ItemSchema]
})

var Day = mongoose.model('Day', DaySchema);

module.exports = Day;