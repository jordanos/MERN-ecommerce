const {GetCoinBalance, AwardCoin, DeductCoin} =require( "../controllers/ricaCoinController")
const router =require('express').Router()

router.post('/balance',GetCoinBalance)
router.post('/',AwardCoin)
router.post('/deduct',DeductCoin)

module.exports=router;