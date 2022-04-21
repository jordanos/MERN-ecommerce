const { activateUser, deactivateUser, deleteProduct, deleteFeed, GetAllUsers } = require("../models/adminModel")

 
 
 module.exports={
    GetAllUsers:(req,res)=>{
        GetAllUsers(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                   message:error,data:result
                })
            }
            else {
                res.status(200).json({
                status:200,
                message:"All Users",
                data:result
               
                
            })}
        })
    },
    ActivateUser:(req,res)=>{
        activateUser(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                   message:error,data:result
                })
            }
            else {
                res.status(200).json({
                status:200,
                message:"user activated",data:result
               
                
            })}
        })
    },
    DeActivateUser:(req,res)=>{
        deactivateUser(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                   message:error,data:result
                })
            }
            else {
                res.status(200).json({
                status:200,
                message:"user deactivated",data:result
               
                
            })}
        })
    },
    RemoveProduct:(req,res)=>{
        deleteProduct(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                   message:error,data:result
                })
            }
            else {
                res.status(200).json({
                status:200,
                message:"product removed",data:result
               
                
            })}
        })
    },
    RemoveFeed:(req,res)=>{
        deleteFeed(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                   message:error,data:result
                })
            }
            else {
                res.status(200).json({
                status:200,
                message:"feed deleted",data:result
               
                
            })}
        })
    },
 }