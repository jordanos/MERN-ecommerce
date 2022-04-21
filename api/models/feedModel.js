 const res = require('express/lib/response')
const command = require('nodemon/lib/config/command')
const pool=require('../dbConnection')
const { createNotification } = require('./notificationModel')


 module.exports={
    createFeed: async (data,req,callback)=>{
        data=JSON.parse(JSON.stringify(data))
        
        if(data.text==undefined  || data.postedby==undefined){
            return callback("please send data with along correct attribute")
         }
         var queryStatment=`insert into feeds set ?`
        if(req.files!=undefined){
        var filename=""
        req.files.forEach(file => {
            filename=filename+file.filename+","
        });
       
        var values={
            text:data.text,
            image:filename, 
            postedby:data.postedby,
         }}
         else{
            var values={
                text:data.text,
                postedby:data.postedby,
             }
         }
        try{pool.query(queryStatment,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                var querystatment3=`select * from follow where following=?`
                                    var value3=[
                                        data.postedby
                                    ]
                                        pool.query(querystatment3,value3,(err,ress)=>{
                                            if(err){
                                                return callback("something went wrong")
                                            } 
                                            else{
                                                for(let i=0;i<ress.length;i++){
                                                    
                                                    createNotification({touser:ress[i].follower,sentfrom:data.postedby,text:`posted a feed`},(error,result)=>{
                                                        if(error){}else{}
                                                    })
                                                };
                                                return callback(null,result)
                                            }
                                        })
            }
        })}catch(error){
            console.error(error);
        }
    },
    getAllFeeds: async (data,callback)=>{
        var queryStatment=`SELECT users.fullname,users.profileimage, feeds.* ,COUNT(feedlikes.feedid) as numberoflike FROM feeds INNER JOIN USERS ON users.userid=feeds.postedby Left JOIN feedlikes on feedlikes.feedid=feeds.feedid GROUP BY feeds.feedid ORDER By feeds.date DESC`
        try{await pool.query(queryStatment,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                
                
                for(var i=0;i<result.length;i++){
                    result[i].profileimage=process.env.APP_HOST+"/feed/images/"+result[i].profileimage
                    
                     const images= result[i].image.split(","); 
                    
                    for (var j=0;j<images.length;j++){
                         
                        if(images[j]=='') {
                        
                        }else{
                         images[j]=process.env.APP_HOST+"/feed/images/"+images[j]
                        }

                    }


                    result[i].image=images
                }
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
  
    
        getAllowedFeeds: async (data,callback)=>{
           
        if(data.userid==undefined ){
            return callback("please send data with along correct attribute")
         }
        var queryStatment=`SELECT users.fullname,users.profileimage, feeds.* ,COUNT(feedlikes.feedid) as numberoflike,CASE WHEN l.likeid IS NULL THEN 'false' ELSE 'true' END as isliked FROM feeds INNER JOIN USERS ON users.userid=feeds.postedby LEFT JOIN feedlikes l ON l.userid = ? and l.feedid =feeds.feedid Left JOIN feedlikes on feedlikes.feedid=feeds.feedid where feeds.postedby in (select follow.following from follow WHERE (?) in (follow.follower)) GROUP BY feeds.feedid ORDER By feeds.date DESC;`
       var values=[data.userid,data.userid]
        try{await pool.query(queryStatment,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                
                if(result.length>0){
                for(var i=0;i<result.length;i++){
                    result[i].profileimage=process.env.APP_HOST+"/feed/images/"+result[i].profileimage
                    
                     const images= result[i].image.split(","); 
                    
                    for (var j=0;j<images.length;j++){
                      if(images[j]=='') {
                        
                       }else{
                        images[j]=process.env.APP_HOST+"/feed/images/"+images[j]
                       }
                         

                    }
                    result[i].image=images
                    
                    if( result[i].isliked===1){
                       result[i].isliked=
                        console.log(true)
                    }
                    else if( result[i].isliked===0){
                        
                        console.log(false)
                    }
                    
               
                }
            }

            
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
    getFeedByID: async (data,callback)=>{
        if(data.feedid==undefined ){
            return callback("please send data with along correct attribute")
         }
         if(data.userid!=undefined){
        var queryStatment=`SELECT users.fullname,users.profileimage, feeds.* ,COUNT(feedlikes.feedid) as numberoflike,CASE WHEN l.likeid IS NULL THEN 'false' ELSE 'true'
        END as isliked FROM feeds INNER JOIN USERS ON users.userid=feeds.postedby LEFT JOIN feedlikes l ON l.userid = ? and l.feedid =feeds.feedid Left JOIN feedlikes on feedlikes.feedid=feeds.feedid WHERE feeds.feedid=? GROUP BY feeds.feedid ORDER By feeds.date DESC;`
        var values=[data.userid,data.feedid]
         }else{
            var queryStatment=`SELECT users.fullname,users.profileimage, feeds.* ,COUNT(feedlikes.feedid) as numberoflike FROM feeds INNER JOIN USERS ON users.userid=feeds.postedby Left JOIN feedlikes on feedlikes.feedid=feeds.feedid WHERE feeds.feedid=? ORDER By feeds.date DESC`
            var values=[feedid=data.feedid]
         }
        try{await pool.query(queryStatment,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                for(var i=0;i<result.length;i++){
                    result[i].profileimage=process.env.APP_HOST+"/feed/images/"+result[i].profileimage
                    
                     const images= result[i].image.split(","); 
                    
                    for (var j=0;j<images.length;j++){
                        
                         if(images[j]=='') {
                        
                        }else{
                         images[j]=process.env.APP_HOST+"/feed/images/"+images[j]
                        }
                    }


                    result[i].image=images
                }
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
    
    getAllFeedBYUserId: async (data,callback)=>{
        if(data.userid==undefined ){
            return callback("please send data with along correct attribute")
         }
         if(data.visitorid!=undefined){
        var querystatement=`SELECT users.fullname,users.profileimage, feeds.* ,COUNT(feedlikes.feedid) as numberoflike,CASE WHEN l.likeid IS NULL THEN 'false' ELSE 'true'
        END as isliked FROM feeds INNER JOIN USERS ON users.userid=feeds.postedby LEFT JOIN feedlikes l ON l.userid = ? and l.feedid =feeds.feedid Left JOIN feedlikes on feedlikes.feedid=feeds.feedid WHERE feeds.postedby=? GROUP BY feeds.feedid ORDER By feeds.date DESC;`
        var values=[data.visitorid,data.userid]
          }
          else{
            var querystatement=`SELECT users.fullname,users.profileimage, feeds.* ,COUNT(feedlikes.feedid) as numberoflike FROM feeds INNER JOIN USERS ON users.userid=feeds.postedby Left JOIN feedlikes on feedlikes.feedid=feeds.feedid WHERE feeds.postedby=? GROUP BY feeds.feedid ORDER By feeds.date DESC`
            var values=[data.userid]
          }
        try{await pool.query(querystatement,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                for(var i=0;i<result.length;i++){
                    result[i].profileimage=process.env.APP_HOST+"/feed/images/"+result[i].profileimage
                    
                     const images= result[i].image.split(","); 
                    
                    for (var j=0;j<images.length;j++){
                        if(images[j]=='') {
                        
                        }else{
                         images[j]=process.env.APP_HOST+"/feed/images/"+images[j]
                        }

                    }


                    result[i].image=images
                }
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }

    },
    
    deleteFeed: async (data,callback)=>{
        if(data.feedid==undefined ){
            return callback("please send data with along correct attribute")
         }
        var querystatement=`Delete from feeds where feedid=?`
        var values=[data.feedid]

        try{await pool.query(querystatement,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
    likeFeed: async (data,callback)=>{
      
        if(data.feedid==undefined ){
            return callback("please send data with along correct attribute")
         }
        var querystatement=`insert into feedlikes set userid=? ,feedid=?`

        var values=[
            data.userid,
            data.feedid
        ]
        
        try{
            await pool.query(querystatement,values,(error,result)=>{
            if(error){
                if(error.code=='ER_DUP_ENTRY'){
                    return callback("you already liked the post")
                }else{
                    return callback(error)
                }   
                
            }
            else{
                var querystatment3=`select * from feeds where feedid=?`
                var value3=[
                        data.feedid
                        ]
                        pool.query(querystatment3,value3,(err,ress)=>{
                            if(err){
                                return callback("something went wrong")
                            }
                            else{
                               
                                createNotification({touser:ress[0].postedby,sentfrom:data.userid,text:`liked your feed`},(error,result)=>{
                    if(error){}else{}
                  })
                            }
                        })
                
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
    unlikeFeed: async (data,callback)=>{
        if(data.feedid==undefined ){
            return callback("please send data with along correct attribute")
         }
        var querystatement=`delete from feedlikes where userid=? and feedid=?`

        var values=[
            data.userid,
            data.feedid
        ]
        
        try{
            await pool.query(querystatement,values,(error,result)=>{
            if(error){
                
                    return callback(error)
                 
                
            }
            else{
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    }
}
