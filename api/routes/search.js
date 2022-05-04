const router = require('express').Router();

const { search } = require('../controllers/searchController');

router.route('/').get(search);

module.exports = router;
