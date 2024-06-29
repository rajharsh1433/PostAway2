import mongoose, { Model, Mongoose, Schema } from "mongoose";

const LikeSchemma = new Mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        required:true,
        ref:'Users'
    },
    likeable:{
        type:mongoose.Schema.ObjectId,
        refPath: 'on_model'
    },
    on_model: {
        type:String,
        enum: ['Posts'],
        required: true
    }

})