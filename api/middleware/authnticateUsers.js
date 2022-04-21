const jwt =require('jsonwebtoken');
const { checkStatusOfuser } = require('../models/userModel');


require('dotenv').config()
module.exports={
    autheticateUser:(req,res,next)=>{
 
        let token;
        if(req.body.token==undefined){
            token=req.get('authorization')
        }
        else{
            token='Bearer '+req.body.token
        }
       
        if(token){
            token=token.slice(7)
            

            jwt.verify(token,process.env.secret_code,(error,decode)=>{
                
                if(error){
                    res.status(404).json({
                        status:404,
                        message:'invalid token'
                    })
                }
                else{
                   
             
                    if(decode.result==req.body.userid || decode.result==req.body.follower ){
                        checkStatusOfuser(req.body,(error,result)=>{
                           
                            if(error){
                                return res.status(404).json({
                                    status:404,
                                    message:error,
                                })
                            }
                            else{
                                next()
                            }
                        })
                        
                    }
                    else{
                        return res.status(404).json({
                            status:404,
                            message:'Access denied! unautorized user'
                        })
                    }
                   
                }
                
            })
        }
        else{
           return res.status(404).json({
                status:404,
                message:'Access denied! unautorized user'
            })
        }
    },
    
}