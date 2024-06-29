import PostRepository from "./posts.repository.js";

export default class PostController {
    constructor() {
        this.postRepository = new PostRepository();
        this.createdPost = this.createdPost.bind(this); // Bind the method to the instance
    }

    async createdPost(req, res, next) {
        try {
            const { userID, imageUrl, caption } = req.body;
            if (!imageUrl) {
                const error = new Error("Image URL not received");
                error.statusCode = 400;
                throw error;
            }
            if (!userID) {
                const error = new Error("UserID not received");
                error.statusCode = 400;
                throw error;
            }
            const newPost = await this.postRepository.createPost(userID, caption, imageUrl);
            if (!newPost) {
                const error = new Error("Post not created, something went wrong.");
                error.statusCode = 400;
                throw error;
            }
            return res.status(201).json({
                success: true,
                post: newPost,
                msg: "Post created successfully"
            });
        } catch (err) {
            console.error("Post not created in controller error:", err);
            next(err); // Pass the error to the next middleware
        }
    }
    //controller for getting all the posts for a user
    async getPosts(req,res,next){
        try{
            const userID = req.params.userID;
            if(!userID){
                throw new Error("User doesn't exists!!");
            }
            const newPosts = await this.postRepository.getPostForUser(userID);
            if(!newPosts){
                throw new error("Error in getting posts!!");
            }
            return res.status(201).json({
                success:true,
                post: newPosts,
                msg: "Posts fetched successfully!!"
            });
        }catch(err){
            console.log(err);
            next(err);
        }
    }
    //controller for getting post as per post id
    async getPost(req,res,next){
        try{
            const postId = req.params.postID;
            const post = await  this.postRepository.getPostById(postId);
            if(!post){
                throw new error("Unable to find post!!!");
            }
            return res.status(201).json({
                success:true,
                post: post,
                mssg:"Post found Successfully"
            });
        }catch(err){
            console.log(err);
            next(err);
        }
    }
    async delete(req,res,next){
        try{
            const postId = req.params.postId;
            const userId = req.body.userId;
            if(!postId){
                throw new Error("Post Id not received!!");
            }
            const result = await this.postRepository.deletePost(postId,userId);
            if(result)
                {
                    return res.status(200).json({
                        success: true,
                        msg: "Post deleted successfully."
                    });
                }
        }catch(err){
            console.log(err);
        }
    }
    async updatePost(req,res,next){
        try{
        const postId = req.params.postId;
        const userId = req.body.userId;
        const updateData = {
            caption: req.body.caption,
            imageUrl: req.body.imageUrl,
        };
        if(!postId){
            throw new Error("Post id not received!!");
        }
        const updatedPost = await this.postRepository.updatePost(postId,userId,updateData);
        if(updatedPost){
            return res.status(200).json({
                success:true,
                post: updatedPost,
                mssg: "Post updated Successfully!!"
            });
        }
        }catch(err){
            console.log(err);
    }
    }
}

