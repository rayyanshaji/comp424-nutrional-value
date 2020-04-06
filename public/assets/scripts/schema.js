import { Mongoose } from "mongoose";

const weightSchema = Mongoose.Schema({
    "username": String,
    "date": Date,
    "weight": Number,
    "units": String 
});

const accountSchema = Mongoose.Schema({
    "username": String,
    "password": String,
    "name": String
});

exports.weightSchema = weightSchema;
exports.accountSchema = accountSchema;