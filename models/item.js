const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    meal: String,
    dateAdded: { type: Date, default: Date.now },
    name: String,
    image_url: String,
    type: String,
    serving_qty: { type: Number, min: 0},
    serving_unit: String
});

var Item = mongoose.model('Item', ItemSchema);

module.exports = Item;