const mongoose = require('mongoose');

 const CategorySchema = new mongoose.Schema({
    categoryId :{type:mongoose.Schema.Types.ObjectId},
    name:{
        type:String,
        required:true
    },
    image :{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
      },
    
 }
 );
 module.exports = mongoose.model("Category", CategorySchema);