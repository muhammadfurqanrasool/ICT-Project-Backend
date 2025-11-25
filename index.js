import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import auth from "./routes/auth.js"
import cookieParser from 'cookie-parser';
import profile from './routes/profile.js';
import posts from './routes/posts.js';


const app = express();
dotenv.config();





// middlewares
app.use(express.json());
app.use(cookieParser());



const corsOptions = {
  // 1. Specify the exact origin(s) allowed to access the API
  origin: ["http://localhost:5173"], 
  
  // 2. 🔑 CRITICAL: Allows the browser to send cookies, 
  // Authorization headers, and SSL client certificates.
  credentials: true, 
  
  // 3. Optional: Specify allowed HTTP methods (usually defaults are fine)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  
  // 4. Optional: Allow setting a preflight cache duration
  maxAge: 604800 
};


app.use(cors(corsOptions));
const PORT = Number(process.env.PORT) || 5500;
const MONGO_URI = process.env.MONGO_URI;




app.get("/", (Request,Response)=>{ 
    Response.status(200).send("<h1>Hello, World!</h1>");
})

app.use("/api/auth", auth);
app.use("/api/profile",profile);
app.use("/api/posts",posts);

async function callback() { 
    console.log("Listening on PORT", PORT);
    await mongoose.connect(MONGO_URI). then(()=>{
        console.log("Connected to Database!")
}).catch(e=>{
    console.log("Error Occured\n", e.message)
});
}

app.listen(PORT,callback)