const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
productId:{type: mongoose.Schema.Types.ObjectId},
owner:{ type:Number, required:true },
name:{ type:String,required:true},
price:{type:Number, required:true},
quantity:{type:Number,required:true},
description:{type:String, required:true},
image:{type:String},
category:{type: String,ref: "Categories"},
productCondition:{type:String,required:true},
isTrending:{type:Boolean, default:false},
brand:{type:String,required:true },
createdAt: {
    type: Date,
    default: Date.now(),
  },
},

);

module.exports = mongoose.model("Product", ProductSchema);