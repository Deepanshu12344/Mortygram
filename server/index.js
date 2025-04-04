import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from "mongoose";
import multer from "multer";
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import morgan from "morgan";
import {register} from './controllers/auth.js';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/posts.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";

// CONFIGURATIONS

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:'30mb' , extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb' , extended:true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// FILE STORAGE
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'public/assets');
    },
    filename : function(req,file,cb){
        cb(null,file.originalname);
    },
});
const upload = multer({storage});

//ROUTES
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", upload.single("picture"), verifyToken, createPost);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// MONGODB
const PORT = process.env.PORT || 3000;
mongoose.connect("mongodb://localhost:27017/mortygram")
.then(()=>{
    app.listen(PORT,()=>console.log(`Server Port: ${PORT}`));
}).catch((error=>console.log(error)));