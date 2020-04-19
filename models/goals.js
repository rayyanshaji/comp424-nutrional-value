const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    dateAdded: { type: Date, default: Date.now },
    weight: {type: Number, min:0}
});

const WeightLogSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    days: [{
        date: String,
        items: [ItemSchema]
    }]
})

var LogWeight = mongoose.model('LogWeight', WeightLogSchema);

module.exports = LogWeight;