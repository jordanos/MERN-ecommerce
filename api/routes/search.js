const router = require('express').Router();

const {
  getSearchedProducts,
  getSearchedUsers,
} = require('../controllers/searchController');

router.route('/').get(getSearchedProducts);
router.route('/users').get(getSearchedUsers);

module.exports = router;
