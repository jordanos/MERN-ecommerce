const pool =require('../dbConnection')

module.exports={
    GetAllUsers: async (data,callback)=>{
        
        var querystatement=`select * from users`
       

        try{await pool.query(querystatement,(error,result)=>{
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
    deleteProduct: async (data,callback)=>{
        if(data.productid==undefined ){
            return callback("please send data with along correct attribute")
         }
        var querystatement=`Delete from products where productid=?`
        var values=[data.productid]

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
    activateUser: async (data,callback)=>{
        if(data.userid==undefined ){
            return callback("please send data with along correct attribute")
         }
        var querystatement=`update users set status=0 where userid=?`
        var values=[data.userid]

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
    deactivateUser: async (data,callback)=>{
        if(data.userid==undefined ){
            return callback("please send data with along correct attribute")
         }
        var querystatement=`update users set status=1 where userid=?`
        var values=[data.userid]

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
    

}