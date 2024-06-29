import express from "express";
import jwtAuth from "../../middlewares/jwt.Middleware.js";
import CommentController from "./commentsController.js";

//initate express router
const commentRouter = express.Router();

//controller object to access controller function
const commentsController = new CommentController();


//adding a comment to a specific post
commentRouter.post('/:postId',jwtAuth,(req,res,next)=>{
    commentsController.addComments(req,res,next);
});

export default commentRouter;