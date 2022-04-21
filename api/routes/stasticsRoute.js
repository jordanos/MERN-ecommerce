const { NumebrOfProduct, NumberOfFeeds, NumberOfUsers, NumeberOfPackageBought, GetAll } = require('../controllers/stasticsController')

const router=require('express').Router()

router.get('/numberofallproducts',NumebrOfProduct)
router.get('/numberofallfeeds',NumberOfFeeds)
router.get('/numberofallusers',NumberOfUsers)
router.get('/numberofallpakageBought',NumeberOfPackageBought)
router.get('/all',GetAll)

module.exports=router