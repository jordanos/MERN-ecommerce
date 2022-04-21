const { createFeed, getAllFeeds, getFeedByID, getAllFeedBYUserId, deleteFeed, likeFeed, getAllowedFeeds, unlikeFeed } = require("../models/feedModel")

module.exports={
    CreateFeed:(req,res)=>{
       
        createFeed(req.body,req,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"feed created sucessfully",
                data:result
            })}
        })
    },
    GetAllFeed:(req,res)=>{
        getAllFeeds(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"feching all feeds sucessful",
                data:result

            })}
        })
    },
    GetAllAllowed:(req,res)=>{
        getAllowedFeeds(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"feching all feeds sucessful",
                data:result

            })}
        })
    },
    GetFeedById:(req,res)=>{
        getFeedByID(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"fetching feed by id sucessful",
                data:result

            })}
        })
    },
    
    GetAllFeedByUserId:(req,res)=>{
        getAllFeedBYUserId(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"fecching all feed By user id sucessful",
                data:result

            })}
        })
    },
    
    DeleteFeed:(req,res)=>{
        deleteFeed(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"deleting feed successfull",
                

            })}
        })
    },
    LikeFeed:async (req,res)=>{
        await likeFeed(req.body,(error,result)=>{
            if(error){
               
                res.json({
                    status:404,
                    message:error
                })
                
            }
           
            else {res.status(200).json({
                status:200,
                message:"feed liked sucessfully",
                

            })}
        })
    },
    UnLikeFeed:async (req,res)=>{
        await unlikeFeed(req.body,(error,result)=>{
            if(error){
               
                res.json({
                    status:404,
                    message:error
                })
                
            }
           
            else {res.status(200).json({
                status:200,
                message:"feed unliked sucessfully",
                

            })}
        })
    },

}