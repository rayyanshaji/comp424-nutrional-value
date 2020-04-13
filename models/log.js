const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    meal: String,
    dateAdded: { type: Date, default: Date.now },
    name: String,
    image_url: String,
    type: String,
    serving_qty: { type: Number, min: 0},
    serving_unit: String
});

const LogSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    days: [{
        date: String,
        items: [ItemSchema]
    }]
})

var Log = mongoose.model('Log', LogSchema);

module.exports = Log;