const mongoose = require('mongoose');
const ItemSchema = require('./item');

const DaySchema = mongoose.Schema({
    date: Date,
    items: [ItemSchema]
})

module.exports = mongoose.model('Day', DaySchema);