const { GetAllNotfications, ReadNotification, MarkAllAsRead, CreateNotification, GetUnReadNotifications } = require('../controllers/notificationController')
const { autheticateUser } = require('../middleware/authnticateUsers')

const router=require('express').Router()

router.post('/all',autheticateUser,GetAllNotfications)

router.post('/read/',autheticateUser,ReadNotification)

router.post('/markallasread/',autheticateUser,MarkAllAsRead)

router.post('/createnotification',CreateNotification)

router.post('/getunread/',autheticateUser,GetUnReadNotifications)

module.exports=router 