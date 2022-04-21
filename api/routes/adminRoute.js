const { ActivateUser, DeActivateUser, RemoveProduct, RemoveFeed, GetAllUsers } = require('../controllers/adminController')
const {authenticateAdmin}=require('../middleware/authenticateAdmin')

const router=require('express').Router()

router.post('/activateuser',authenticateAdmin,ActivateUser)
router.post('/deactivateuser',authenticateAdmin,DeActivateUser)
router.post('/removeproduct',authenticateAdmin,RemoveProduct)
router.post('/removefeed',authenticateAdmin,RemoveFeed)
router.post('/Allusers',authenticateAdmin,GetAllUsers)


module.exports=router
