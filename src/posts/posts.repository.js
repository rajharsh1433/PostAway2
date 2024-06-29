//imports
import {ObjectId} from "mongodb";
import { PostModel } from "./posts.schema.js";
import { UserModel } from "../features/users/userSchema.js";

export default class PostRepository{
    
    //create a new post
    async createPost(userID,caption,imageUrl)
    {
        try{
            //creating a new post
            const newPost = new PostModel({
                user: userID,
                caption: caption,
                imageUrl: imageUrl
            });
            //save the post
            const savedPost = await newPost.save();
            //find the user by id
            const user = await UserModel.findById(userID);
            user.posts.push(newPost);
            await user.save();
            return savedPost;
        }catch(error){
            console.log("model error"+error);
        }
    }

    //getting all the post created by a particular user
    async getPostForUser(userID){
            try {
                const posts = await PostModel.find({ user: userID })
                    .populate({
                        path: 'user',
                        select: 'name email gender _id'
                    })
                    .populate({
                        path: 'comments',
                        select: '-_id'
                    })
                    .populate({
                        path: 'likes',
                        select: '-_id'
                    });
                    if(posts.length===0){
                        throw new Error("Cannot find posts!!");
                    }
                    return posts;
        }catch(err){
            console.log("Database error",err);
            next(err);
        }
    }
    //getting a post based on post id
    async getPostById(postID){
        try{
            const post = await PostModel.findById(postID).populate({
                path: "user",
                select: 'name email gender _id'
            });
            if(!post){
                throw new Error("Unable to find post!!");
            }
            return post;
        }catch(err){
            console.log(err);
            next(err);
        }
    }
    //deleting a particular post based on post id and user id:-
    async deletePost(postId,userId){
        try{
            const post = await PostModel.findById(postId);
            if(!post){
                throw new Error("Post not found in db");
            }
            if(String(post.user)!==userId){
                throw new Error("You are not allowed to delete this post!!");
            }
            const result = await PostModel.findByIdAndDelete(postId);
            if(!result)
            {
                throw new ApplicationError("No post exist on this id.", 404);
            }
            return result; 
        }catch(err){
            console.log(err);
        }
    }
    //update a specific post
    async updatePost(postId,userId,updatePostData){
        try{
            const post = await PostModel.findById(postId);
            if(String(post.user)!==userId){
                throw new Error("You are not allowed to update this post!!");
            }
            const updatedPost = await PostModel.findByIdAndUpdate(postId, updatePostData, { new: true })
            .populate({
                path:"user",
                select:'name email gender _id'
            });
            return updatedPost;
        }catch(err){
            console.log(err);
        }
    }

}
    
