const { GetConversation, SendMessage, GetMessageByConversationId, CheckIfConversationExistBetweenTwoUsers, CreateConversation, ReadAllMessage } = require('../controllers/conversationController')
const { autheticateUser } = require('../middleware/authnticateUsers')


const router=require('express').Router()


router.post('/get/:userid',GetConversation)
router.post('/sendmessage',SendMessage)
router.post('/message',GetMessageByConversationId)

router.post('/checkconversation',CheckIfConversationExistBetweenTwoUsers)

router.post('/createconversation',CreateConversation)
router.post('/readallmessage',ReadAllMessage)


module.exports=router