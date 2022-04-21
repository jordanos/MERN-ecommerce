const { CreateFeed, GetAllFeed, GetFeedById, DeleteFeed, GetAllFeedByUserId, LikeFeed, GetAllAllowed, UnLikeFeed } = require('../controllers/feedController')
const multer=require("multer")
const path=require('path')
const express=require('express')
const router=require('express').Router()
const {autheticateUser}=require("../middleware/authnticateUsers")
const { getAllowedFeeds } = require('../models/feedModel')
const { authenticateAdmin } = require('../middleware/authenticateAdmin')

const storage=multer.diskStorage({
    destination:"./src/images",
    filename:(req,file,cb)=>{
        return cb(null,`feed_${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload=multer({
    storage:storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        var respo={
            status:404,
            message:'Only images are allowed'
        }
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(JSON.stringify(respo))
            
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024*1024
    }
    
    
})

router.use('/images',express.static('./src/images'))

router.get('/',GetAllFeed)
router.post('/create',upload.array('multi-files'),CreateFeed)

router.post("/getfeed/",GetFeedById)
router.post("/getallowed",GetAllAllowed)

router.delete("/delete",autheticateUser,DeleteFeed)

router.post("/user",GetAllFeedByUserId)
router.post("/like",autheticateUser,LikeFeed)
router.post("/unlike",autheticateUser,UnLikeFeed)



module.exports=router 