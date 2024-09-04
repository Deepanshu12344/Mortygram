import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import path from path;
import mongoose from "mongoose";
import multer from "multer";
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import morgan from "morgan";

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




const PORT = process.env.PORT || 3000;

app.listen(PORT,(request,response)=>{
    console.log(`App running on port ${PORT}`)
});