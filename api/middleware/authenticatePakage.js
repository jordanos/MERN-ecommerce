
const { checkIfuserPackageStatus } = require('../models/packageModel')
const pool =require( '../dbConnection')
module.exports={
    authenticatePackage:async (req,res,next)=>{
         
       
        if (req.body.postedby==undefined){
            return callback("please send data with correct attribut")
        }
        var queryStatment=`select * from subscriptions where userid=?  and subscription_end_timestamp>now() and status=2 and postleft>0`
        
        var values=[
            req.body.postedby
    ]
        try{
            await pool.query(queryStatment,values,(error,result)=>{
            if(error){
                console.log(error)
                return callback(error)
            }
            else{
               
                if(result && result.length >0){
                 
                    next()
                      
                  }
                   else{
                       return res.status(404).json({
                           status:404,
                           message:'Access denied! please buy pakage'
                       })
                   }
            }
        })}catch(error){
            console.error(error);
        }
   
    
        
        
    }
}