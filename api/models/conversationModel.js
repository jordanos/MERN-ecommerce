const pool=require('../dbConnection')
 
module.exports={
    getCoversation:(data,callback)=>{
        if(data.userid==undefined){
            return callback("please send with correct parameter")
        }
        var querystatment=`SELECT p1.*,p2.last_seen,p2.unread
        FROM conversation p1
        INNER JOIN
        (SELECT max(message.time) last_seen, COUNT(CASE WHEN status = 0 && sender!=? THEN 1 ELSE NULL END) unread,messageid,conversationid
            FROM message
            GROUP BY conversationid
        ) p2
          ON p1.conversationid = p2.conversationid
          where (?) in(p1.senderid , p1.reciverid)
          ORDER BY p2.last_seen desc;`
        var value=[
            data.userid,
            data.userid
        ]
        pool.query(querystatment,value,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result)
            }
        })
    },
    getAllMessageByConversationId:(data,callback)=>{
        if(data.conversationid==undefined || data.userid==undefined ){
            return callback("please send with correct parameter")
        }
        var querystatment=`SELECT * FROM message WHERE conversationid=?`
        var value=[
            data.conversationid
        ]
        pool.query(querystatment,value,(error,result)=>{
            if(error){
                
                return callback(error)

            }
            else{
                var querystatment2=`update message set  status=1 WHERE conversationid=? and sender!=?`
                var value2=[
                    data.conversationid,
                    data.userid
                ]
                pool.query(querystatment2,value2,(errorr,resultt)=>{
                        if(errorr){  
                            return callback(errorr)
                        }else{
                            return callback(null,result)
                        }
                })
                
            }
        })
    },
    sendMessage:(data,callback)=>{
        if(data.conversationid==undefined || data.sender==undefined ||data.text==undefined){
            return callback("please send with correct parameter")
        }
        var querystatment=`insert into message set conversationid=?,sender=?,text=?`
        var value=[
            data.conversationid,
            data.sender,
            data.text
        ]
        pool.query(querystatment,value,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result)
            }
        })
    },
    checkCoversationBetweenTwoUsers:(data,callback)=>{
        if(data.sender==undefined || data.reciever==undefined){
            return callback("please send with correct parameter")
        }
        var querystatment=`SELECT * FROM conversation WHERE ? in (senderid,reciverid) and ? in (senderid,reciverid);`
        var value=[
            data.sender,
            data.reciever
        ]
        pool.query(querystatment,value,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                if(result=="" || result ==[] ||result==null){
                    return callback("coversation doesnt exist")
                }
                return callback(null,result)
            }
        })
    },
    createCoversation:(data,callback)=>{
        if(data.sender==undefined || data.reciever==undefined){
            return callback("please send with correct parameter")
        }
        var querystatment=`SELECT * FROM conversation WHERE ? in (senderid,reciverid) and ? in (senderid,reciverid);`
        var value=[
            data.sender,
            data.reciever
        ]
        pool.query(querystatment,value,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                if(result=="" || result ==[] ||result==null){
                    var querystatment=`Insert into conversation set senderid=?,reciverid=?`
                    var value=[
                        data.sender,
                        data.reciever
                    ]
                    pool.query(querystatment,value,(error,result)=>{
                        if(error){
                            return callback(error)
                        }
                        else{
                            var querystatment=`SELECT * FROM conversation WHERE ? in (senderid,reciverid) and ? in (senderid,reciverid);`
                            var value=[
                                data.sender,
                                data.reciever
                            ]
                            pool.query(querystatment,value,(error,result)=>{
                                if(error){
                                    return callback(error)
                                }
                                else{return callback(null,result)}
                            })
                        }
                    })
             }
             else{
                return callback(null,result)
             }
                
            }
        })
        
    },
    readAllMessageByUserId:(data,callback)=>{
        if(data.userid==undefined){
            return callback("please send with correct parameter")
        }
        var querystatment=`UPDATE message SET message.status=1 where messageid in (select message.messageid from conversation LEFT JOIN message on message.conversationid=conversation.conversationid WHERE (?) in (conversation.senderid,conversation.reciverid) and message.sender!=?);`
        var value=[
            data.userid,
            data.userid
          
        ]
        pool.query(querystatment,value,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result)
            }
        })
    },
   

}