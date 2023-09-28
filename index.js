const express=require("express");
const connection=require("./config/db")
const userRouter=require("./routes/userRoute")
const blogRouter=require("./routes/blogRoute")
const authenticate=require("./middlewares/auth.middleware")
const cors=require("cors")

const app=express();
app.use(express.json());
app.use(cors());

app.get("/", (req,res)=>{
    res.send("Home page....")
})

app.use(userRouter)
app.use(blogRouter)
app.use(authenticate)

app.listen(6500, async()=>{
    try {
        await connection
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
    console.log("Server is running on port 6500");
})