const express = require('express');
const Admin = require('../models/Feed');

const router = express.Router();

const { createAdmin, getAdmin } = require('../controllers/userController');
const { adminLogin, logout } = require('../controllers/authController');
const { adminReq } = require('../middlewares/authorizationMiddleware');

router.route('/create').post(createAdmin);
router.route('/login').post(adminLogin);
router.route('/logout').post(logout);
router.route('/getAdmin').get(getAdmin);
module.exports = router;
