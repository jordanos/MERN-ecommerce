const { getAllNotification, getUnreadNotifications, createNotification, setNotificationRead, markAllNotificationAsRead } = require("../models/notificationModel")

 
module.exports={
    GetAllNotfications:(req,res)=>{
        getAllNotification(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"fetching data successful",
                data:result
            })}
        })
    }, GetUnReadNotifications:(req,res)=>{
        getUnreadNotifications(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"fetching data successful",
                data:result
            })}
        })
    }, CreateNotification:(req,res)=>{
        createNotification(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"notification created successful",
                data:result
            })}
        })
    }, 
    ReadNotification:(req,res)=>{
        setNotificationRead(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"notification set to read successful",
                data:result
            })}
        })
    },
    MarkAllAsRead:(req,res)=>{
        markAllNotificationAsRead(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"all notification set to read",
                data:result
            })}
        })
    },
}