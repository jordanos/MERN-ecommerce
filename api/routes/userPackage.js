const router = require('express').Router();

const {buyPackage} = require('../controllers/userPackageController');
 
router.route('/').post(buyPackage);

module.exports = router;