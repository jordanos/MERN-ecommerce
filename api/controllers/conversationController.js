const { getCoversation, sendMessage, getAllMessageByConversationId, checkCoversationBetweenTwoUsers, createCoversation, readAllMessageByUserId } = require("../models/conversationModel")


module.exports={
    GetConversation:(req,res)=>{

        getCoversation(req.params,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error 
                })
            }
            else{
                res.json({
                    status:200,
                    message:"fetching data successful",
                    data:result
                })
            }
        })
    },
    SendMessage:(req,res)=>{

        sendMessage(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else{
                res.json({
                    status:200,
                    message:"message sent",
                    
                })
            }
        })
    },
    GetMessageByConversationId:(req,res)=>{

        getAllMessageByConversationId(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else{
                res.json({
                    status:200,
                    message:"fetching data succssful",
                    data:result
                    
                })
            }
        })
    },
    CheckIfConversationExistBetweenTwoUsers:(req,res)=>{

        checkCoversationBetweenTwoUsers(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else{
                res.json({
                    status:200,
                    message:"coversation found",
                    data:result
                    
                })
            }
        })
    },
    CreateConversation:(req,res)=>{

        createCoversation(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else{
                res.json({
                    status:200,
                    message:"creating conversation sucessful",
                    data:result
                    
                })
            }
        })
    },
    ReadAllMessage:(req,res)=>{

        readAllMessageByUserId(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else{
                res.json({
                    status:200,
                    message:"reading all message succesful",
                    
                    
                })
            }
        })
    },
}