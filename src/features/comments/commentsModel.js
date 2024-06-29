import { CommentModel } from "./commentsSchema.js";
import { PostModel } from "../../posts/posts.schema.js";
import mongoose from "mongoose";

export default class CommentRepository {
    // Adding comments to the db
    async add(userId, postId, content) {
        try {
            const post = await PostModel.findById(postId);
            if (!post) {
                throw new Error("No post found with this id");
            }

            const newComment = new CommentModel({
                user: new mongoose.Types.ObjectId(userId),
                post: new mongoose.Types.ObjectId(postId),
                content: content
            });

            const savedComment = await newComment.save();

            // Adding the saved comment to the post's comments array
            post.comments.push(savedComment);
            await post.save();

            // Populating the user field with name and email_id
            return savedComment.populate({ path: 'user', select: 'name email_id' });
        } catch (error) {
            console.error(error);
            throw error; // It's generally good practice to rethrow the error after logging it
        }
    }
}
