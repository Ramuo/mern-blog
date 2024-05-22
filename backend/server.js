import path from 'path';
import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import {notFound, errorHandler} from './middleware/errorMiddleware.js';



import userRoute from './routes/userRoute.js';
import posteRoute from './routes/postRoute.js';
import uploadRoute from './routes/uploadRoute.js';
import commentRoute from './routes/commentRoute.js'






const port = process.env.PORT;

//CONNECT DB
connectDB();

//INITIALIZE EXPRESS
const app = express();

//BODY PARSER MIDDLEWARE
app.use( express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

//ROUTES

app.use('/api/users', userRoute);
app.use('/api/posts', posteRoute)
app.use('/api/upload', uploadRoute);
app.use('/api/comments', commentRoute);


//STATIC ROUTE
const __dirname = path.resolve(); //Set __dir to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
    res.send('API is running');
});

//MIDDLEWARE
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is runing on port ${port}`) );