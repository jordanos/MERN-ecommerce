const { getNumberOfusers, getNumberOfFeeds, getNumberOfProdcuts, getNumberOfpackageBought, getAllStat } = require("../models/stasticsModel")

module.exports={
    GetAll:(req,res)=>{
        getAllStat(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                   message:error,data:result
                })
            }
            else {
                res.status(200).json({
                status:200,
                message:"feching data  sucessfully",data:result
               
                
            })}
        })
    },
    NumberOfUsers:(req,res)=>{
        getNumberOfusers(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                   message:error,data:result
                })
            }
            else {
                res.status(200).json({
                status:200,
                message:"feching data  sucessfully",data:result
               
                
            })}
        })
    },
    NumberOfFeeds:(req,res)=>{
        getNumberOfFeeds(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                   message:error,data:result
                })
            }
            else {
                res.status(200).json({
                status:200,
                message:"feching data  sucessfully",data:result
               
                
            })}
        })
    },
    NumebrOfProduct:(req,res)=>{
        getNumberOfProdcuts(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                   message:error,
                   data:result
                })
            }
            else {
                res.status(200).json({
                status:200,
                message:"feching data  sucessfully",data:result
               
                
            })}
        })
    },
    NumeberOfPackageBought:(req,res)=>{
        getNumberOfpackageBought(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                   message:error,data:result
                })
            }
            else {
                res.status(200).json({
                status:200,
                message:"feching data  sucessfully",data:result
               
                
            })}
        })
    },

}