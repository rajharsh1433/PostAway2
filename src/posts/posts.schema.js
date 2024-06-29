import mongoose, { Schema } from "mongoose";

export const postSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    imageUrl: {
        type: String
    },
    caption: {
        type:String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            type: mongoose.Schema.ObjectId,
             ref:'Comment'
        }
    ],
    likes: [
        {
            type: Number//mongoose.Schema.ObjectId,
           // ref: 'Like'
        }
    ]

});
export const PostModel = mongoose.model('Post',postSchema);
