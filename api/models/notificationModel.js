const pool=require('../dbConnection')

module.exports={
    getAllNotification:(data,callback)=>{
        if(data.userid==undefined ){
            return callback("please send data with along correct attribute")
         }
        const querystatment=`select notifications.*,users.fullname from notifications LEFT JOIN users on notifications.sentfrom=users.userid WHERE notifications.touser=?`
        const value=[data.userid]
        pool.query(querystatment,value,(error,result)=>{
            if(error){
                return callback(error)
            }else{
                return callback(null,result)
            }
        })
    }, 
    getUnreadNotifications:(data,callback)=>{
        if(data.userid==undefined ){
            return callback("please send data with along correct attribute")
         }
        const querystatment=`select notifications.*,users.fullname from notifications LEFT JOIN users on notifications.sentfrom=users.userid WHERE notifications.status=0 and notifications.touser=?`
        const value=[data.userid]
        pool.query(querystatment,value,(error,result)=>{
            if(error){
                return callback(error)
            }else{
                return callback(null,result)
            }
        })
    },
    createNotification:(data,callback)=>{
        
        if(data.touser==undefined || data.text==undefined ||data.sentfrom==undefined){
            return callback("please send data with along correct attribute")
         }
        const querystatment=`insert into notifications set touser=?,sentfrom=?,text=?`
        const value=[data.touser,data.sentfrom,data.text]
        pool.query(querystatment,value,(error,result)=>{
            if(error){
                return callback(error)
            }else{
                return callback(null,result)
            }
        })
    },
    setNotificationRead:(data,callback)=>{
    
        if(data.notificationid==undefined ){
            return callback("please send data with along correct attribute")
         }
        const querystatment=`update  notifications set status=1 where notificationid=?`
        const value=[data.notificationid]
        pool.query(querystatment,value,(error,result)=>{
            if(error){
                return callback(error)
            }else{
                return callback(null,result)
            }
        })
    },
    markAllNotificationAsRead:(data,callback)=>{
        if(data.userid==undefined ){
            return callback("please send data with along correct attribute")
         }
        const querystatment=`update  notifications set status=1 where status=0 and touser=?`
        const value=[data.userid]
        pool.query(querystatment,value,(error,result)=>{
            if(error){
                return callback(error)
            }else{
                return callback(null,result)
            }
        })
    },
}