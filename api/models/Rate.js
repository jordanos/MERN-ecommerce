const mongoose = require("mongoose");
const RateSchema = new mongoose.Schema({
    rateScore:{type:Number,default:0},
    User:{type:mongoose.Schema.ObjectId,
    refs:"users"}
    })