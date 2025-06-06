import dotenv from "dotenv"
dotenv.config()
import express from "express"
const app = express();
import authRoutes from "./routes/auth.route.js"
import connectDB from "./lib/db.js"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"
import cors from "cors"
import path from "path"

connectDB();

const __dirname=path.resolve(); 
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// app.get("/", (req,res,next)=>{
//     res.status(200).json({message:"hello from server"})
// })

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req,res) =>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})