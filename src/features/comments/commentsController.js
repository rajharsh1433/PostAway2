import CommentRepository from "./commentsModel.js";
import express from "express";

export default class CommentController{

    constructor(){
        this.commentRepository = new CommentRepository();
    }
    //Get comments for a specific post.
    async addComments(req,res,next){
        try{
            const userId = req.body.userId;
            const postId = req.params.postId;
            const content = req.body.content;
            console.log(postId);

            if(!content){
                throw new Error("Enter content");
            }
            if(!postId){
                throw new Error("Enter post id");
            }
            const comment = await this.commentRepository.add(userId,postId,content);
            if(!comment){
                throw new Error("New comment cannot be added on this post something went wrong ");
            }
            return res.status(200).json({
                success: true,
                comment: comment,
                msg: "New comment added"
            });
        }catch(err){
            console.log(err);
        }
    }
}