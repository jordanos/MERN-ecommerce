const {createUser,login, profile, editProfile, getUserById, uploadCoverPic, followUser, unfollowUser, getFollowers, getFollowing, changePassword, isFollowing, suggestedFriend, getAllusers} =require('../models/userModel')
const {sign} =require('jsonwebtoken')
 
require('dotenv').config()
module.exports={
    CreateUser:(req,res)=>{
         
        createUser(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"usercreated succesfully",
                data:result
            })}
        })
    },
    Login:(req,res)=>{
        login(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else{
                
            let token=sign({result:[result[0].userid],role:[result[0].role]},process.env.secret_code)
              res.status(200).json({
                status:200,
                message:"login sucessful",
                data:result,    
                token:token
            })}
        })
    },
    ChangePassword:(req,res)=>{
        changePassword(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else{
                
            
              res.status(200).json({
                status:200,
                message:"changing password sucessful",
                   
               
            })}
        })
    },
    EditProfile:(req,res)=>{
        editProfile(req.body,req,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
           
            else {res.status(200).json({
                status:200,
                message:"profile updated succesfully",
                data:result,
                
            })}
        })
    },
    GetUserById:(req,res)=>{
        getUserById(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
           
            else {res.status(200).json({
                status:200,
                message:"success",
                data:result,
                
            })}
        })
    },
    UploadCoverPicture:(req,res)=>{
        uploadCoverPic(req.body,req,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
           
            else {res.status(200).json({
                status:200,
                message:"cover picture updated succesfully",
                data:result,
                
            })}
        })
    },
    FollowUser:(req,res)=>{
        followUser(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
           
            else {res.status(200).json({
                status:200,
                message:"followed user successfully",
                
                
            })}
        })
    },
    UnFollowUser:(req,res)=>{
        unfollowUser(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
           
            else {res.status(200).json({
                status:200,
                message:"unfollowing user successfully",
               
                
            })}
        })
    },
    GetFollower:(req,res)=>{
        getFollowers(req.params,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
           
            else {res.status(200).json({
                status:200,
                message:"feching follower data successfully",
                data:result,
                
            })}
        })
    },

    GetFollowing:(req,res)=>{
        getFollowing(req.params,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
           
            else {res.status(200).json({
                status:200,
                message:"feching following data successfully",
                data:result,
                
            })}
        })
    },
    IsFollowing:(req,res)=>{
        isFollowing(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
           
            else {res.status(200).json({
                status:200,
                message:"feching data successfully",
                data:result,
                
            })}
        })
    },
    SuggestedFriend:(req,res)=>{
        suggestedFriend(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
           
            else {res.status(200).json({
                status:200,
                message:"feching data successfully",
                data:result,
                
            })}
        })
    },
    GetAllUsers:(req,res)=>{
        getAllusers(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
           
            else {res.status(200).json({
                status:200,
                message:"feching data successfully",
                data:result,
                
            })}
        })
    },
}