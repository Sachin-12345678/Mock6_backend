const express=require("express");
const {JsonWebToken}=require("jsonwebtoken");
const userModel=require("../models/userModel");
const userRouter=express.Router();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

userRouter.post("/signup", async(req,res)=>{
    const {username,email,password}=req.body

    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err) res.send({"msg":"Something went wrong","error": err.meaasge})
            else{
              const user=new userModel({username,email,password:hash})
              await user.save();
              res.send({"msg":"Signup Successfully"})
        }
        });
    } catch (err) {
        res.send({"msg":"Something went wrong","error": err.meaasge})
    }
})

userRouter.post("/login", async(req,res)=>{
    const {email,password}=req.body

    try {
        const user=await userModel.find({email})
        if(user.length>0)
        {
            bcrypt.compare(password,user[0].password,(err, result)=>{
                if(result){
                   let token=jwt.sign({userID:user[0]._id},"masai")
                   res.send({"msg":"login successful", "token":token})
                }
                else{
                    res.send({"msg":"wrong inform"})
                }
            });
        }
        else{
            res.send({"msg":"login failed"})
        }
    } catch (err) {
        res.send({"msg":"Something went wrong","error": err.meaasge})
    }
})

module.exports=userRouter;