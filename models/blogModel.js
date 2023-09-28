const mongoose=require("mongoose");

const blogSchema=new mongoose.Schema({
    title: {type: String, require: true},
    content: {type: String, require: true},
    category: {type: String, require: true},
    like: {type: Number, default: 0},
    comments: [{username: String, content: String}]
});

const blogModel=mongoose.model("Blog",blogSchema);

module.exports=blogModel;