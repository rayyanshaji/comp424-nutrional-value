const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoalsSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    days: [{
        date: String,
        weight: {type: Number, min: 0}
    }]
})

var Goals = mongoose.model('Goals', GoalsSchema);

module.exports = Goals;