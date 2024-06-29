//importing all the necessary modules and libraries

import express from 'express';
import { connectUsingMongoose } from './config/mongooseConfig.js';
import userRouter from './src/features/users/userRoutes.js';
import postRouter from './src/posts/posts.routes.js';
import commentRouter from './src/features/comments/commentsRoutes.js';

//creating server
const app = express();


// Json parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//user Routers
// Routes related to all features
app.use('/api/users', userRouter);
//Routes related to posts
app.use('/api/post',postRouter);
//routes related to comments
app.use('/api/comments',commentRouter);
//connecting to server
app.listen('5500',()=>{
    console.log("Server is listening on: localhost:5500");
    connectUsingMongoose();
});