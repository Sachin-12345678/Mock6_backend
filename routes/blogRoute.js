const express=require("express");
const blogModel=require("../models/blogModel");
const blogRouter=express.Router();

blogRouter.get("/blogs", async(req,res)=>{
    try {
        const blog=await blogModel.find();
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
})

blogRouter.post("/blogs", async(req,res)=>{
    try {
        const {username,title,content,category}=req.body;

        const newBlog=await blogModel.create({
            username,title,content,category
        });
        res.status(200).json(newBlog);
    } catch (error) {
        res.status(500).json({message: "something wrong here"})
    }
})

blogRouter.put("/blogs/:id", async(req,res)=>{
    try {
        const {id}=req.params;
        const {title,content,category}=req.body;

        const updateblog=await blogModel.findByIdAndUpdate(id,{title,content,category}, {new: true});
        res.status(200).json(updateblog);
    } catch (error) {
        res.status(500).json({message: "something wrong here"});
    }
})

blogRouter.delete("/blogs/:id", async(req,res)=>{
    try {
        const {id}=req.params;
        await blogModel.findByIdAndDelete(id);

        res.status(204).end();
    } catch (error) {
        res.status(500).json({message: "something wrong here"});
    }
})

module.exports=blogRouter;
