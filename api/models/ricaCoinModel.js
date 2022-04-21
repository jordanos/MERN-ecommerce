const pool=require('../dbConnection')

module.exports={
    getCoinBalance:(data,callback)=>{
     
        if(data.userid==undefined){
            return callback("please send data with correct attribute")
        }
        else{
            
            var querystatement="select userid,balance from ricacoin where userid=?"
            var values=[data.userid]

            pool.query(querystatement,values,(error,result)=>{
                if(error){
                    return callback(error)
                }
               else{ if(result==''){
                   result=[{ userid: data.userid, balance: 0 }]
                   return callback(null,result)
               }
               else{
                return callback(null,result)
               }}
                
            })
        }
        
    },
    awardCoin:(data,callback)=>{
        if(data.userid==undefined||data.reward==undefined){
            return callback("please send data with correct attribute")
        }
       else {var querystatement ='INSERT INTO ricacoin (userid,balance) values(?,?) on DUPLICATE KEY update balance=balance+?'
        var values=[data.userid,data.reward,data.reward]
        pool.query(querystatement,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result)
            }
        })}

    },
    deductCoin:(data,callback)=>{
        if(data.userid==undefined||data.coinamount==undefined){
            return callback("please send data with correct atribute")
        }
        else {var querystatement ='update ricacoin set balance=balance-? where userid=?'
        var values=[data.coinamount,data.userid]
        pool.query(querystatement,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result)
            }
        })}
    },

}