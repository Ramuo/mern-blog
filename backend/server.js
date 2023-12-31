import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import {notFound, errorHandler} from './middleware/errorMiddleware.js';



import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';




const port = process.env.PORT;

//CONNECT DB
connectDB();

//INITIALIZE EXPRESS
const app = express();

//BODY PARSER MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

//ROUTES
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);


app.get('/', (req, res) => {
    res.send('API is running');
});

//MIDDLEWARE
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is runing on port ${port}`) );