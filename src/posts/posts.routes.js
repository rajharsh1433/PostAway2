import express from "express";
import jwtAuth from "../middlewares/jwt.Middleware.js";
import PostController from "./posts.controller.js";


//initializing the post router
const postRouter = express.Router(); 

//initializing the Post controller
const postController = new PostController();

//create post route
postRouter.post('/create-post',jwtAuth,(req,res,next)=>{
    postController.createdPost(req,res,next);
})
//creating get post route
postRouter.get('/get-post/:userID',jwtAuth,(req,res,next)=>{
    postController.getPosts(req,res,next);
});
//getting post as per post id
postRouter.get('/get-post-id/:postID',(req,res,next)=>{
    postController.getPost(req,res,next);
});
//route for deleting post
postRouter.delete('/delete-post/:postId',jwtAuth,(req,res,next)=>{
    postController.delete(req,res,next);
})
//route for updating the post
postRouter.patch('/update-post/:postId',jwtAuth,(req,res,next)=>{
    postController.updatePost(req,res,next);
})
//exporting the route
export default postRouter;
