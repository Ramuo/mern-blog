import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./config/db.js";




const port = process.env.PORT;

//CONNECT DB
connectDB();

//INITIALIZE EXPRESS
const app = express();

app.get('/', (req, res) => {
    res.send('API is running');
});



app.listen(port, () => console.log(`Server is runing on port ${port}`) );