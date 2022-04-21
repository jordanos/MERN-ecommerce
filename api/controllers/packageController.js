const { buyPackage, approvePackage, denyPackage, packageStatus, getPackageByUserId, checkIfuserPackageStatus, deletePackage, getPackageDetail, updatePackage, buyPackageWithRicaCoin } = require("../models/packageModel")

 
module.exports={
    BuyPackage:(req,res)=>{
        buyPackage(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {
                res.json({
                status:200,
                message:"Buying package succesfful",
                
            })}
        })
    },
    BuyPackageWithRicaCoin:(req,res)=>{
        buyPackageWithRicaCoin(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {
                res.json({
                status:200,
                message:"Buying package with rica coin succesfful",
                
            })}
        })
    },
    ApprovePackage:(req,res)=>{
        approvePackage(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"package approved sucessfuly",
                data:result
            })}
        })
    },
    DenyPackage:(req,res)=>{
        denyPackage(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"package succesfuly denied",
                data:result
            })}
        })
    },
    PackageStatus:(req,res)=>{
        packageStatus(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"",
                data:result
            })}
        })
    },
    GetPackageByUserId:(req,res)=>{
        getPackageByUserId(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"",
                data:result
            })}
        })
    },
    CheckIfuserPackageStatus:(req,res)=>{
        checkIfuserPackageStatus(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"",
                data:result
            })}
        })
    },
    DeletePackage:(req,res)=>{
        deletePackage(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"deleting package successful",
                data:result
            })}
        })
    },
    GetPackageDetail:(req,res)=>{
        getPackageDetail(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"feching data successful",
                data:result
            })}
        })
    },
    UpdatePackage:(req,res)=>{
        updatePackage(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"updating successful",
                data:result
            })}
        })
    },
    


   

}