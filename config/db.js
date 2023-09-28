const mongoose=require("mongoose");

const connection=mongoose.connect("mongodb+srv://sachin:chavan@cluster0.as6dsds.mongodb.net/mock6?retryWrites=true&w=majority");

module.exports=connection;