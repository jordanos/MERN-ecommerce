// const PackageTypes = require('../models/PackageTypes');

//  const {createProduct} = require('./productController');

exports.buyPackage = (req, res) => {
  //  const count = 0;
  const packageId = req.body.PackageId;
  res.send(packageId);
  
};
