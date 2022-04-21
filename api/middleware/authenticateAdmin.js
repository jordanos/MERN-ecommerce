const jwt=require('jsonwebtoken')
module.exports={
    authenticateAdmin:(req,res,next)=>{
         
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
                  

                    if(decode.role=="admin"){
                        
                        next()
                    }
                    else if(decode.role=="user"){
                        return res.status(404).json({
                            status:404,
                            message:'Access denied! unautorized user'
                        })
                    }
                    else {
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