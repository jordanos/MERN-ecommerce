const mongoose = require('mongoose');

const PackageTypesSchema = new mongoose.Schema({
  name:{type:String,required:true},
  price: {type:Number, required:true},
  expiresIn: {type:Date},
  createdAt: {
     type: Date,
     default: Date.now(),
   },
});

module.exports = mongoose.model('PackageTypes', PackageTypesSchema);


