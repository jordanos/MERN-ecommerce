const { getCoinBalance, awardCoin, deductCoin }= require( "../models/ricaCoinModel")

module.exports={
    GetCoinBalance:(req,res)=>{
        getCoinBalance(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                   message:error,

                })
            }
            else {
                res.status(200).json({
                status:200,
                message:"reward coin",
                data:result
               
                
            })}
        })
    },
    AwardCoin:(req,res)=>{
        awardCoin(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                   message:error,

                })
            }
            else {
                res.status(200).json({
                status:200,
                message:"user awarded coin successfully",
                
               
                
            })}
        })
    },
    DeductCoin:(req,res)=>{
        deductCoin(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                   message:error,

                })
            }
            else {
                res.status(200).json({
                status:200,
                message:"coin deduction successfully",
                
               
                
            })}
        })
    }

}