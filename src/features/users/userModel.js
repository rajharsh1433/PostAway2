import mongoose from "mongoose";
import { UserModel} from "./userSchema.js";

export default class UserRepository{
    //user signup
    async signUp(user)
    {
        try{
            const newUser = new UserModel(user);
            const savedUser = await newUser.save();
            const userwithoutPassword = {...savedUser.toObject()}; 
            delete userwithoutPassword.password;
            return userwithoutPassword;
        }catch(error){
            console.log("User cannot be created");
            console.log("Database error:"+error);
        }
    }
    //find user by email
    async findByEmail(email){
        try{
        const user = await UserModel.findOne({email});
        if(!user){
            throw new Error("User not found!!");
        }
        return user;
    }catch(err){
        console.log("User cannot be found in DB"+err);
    }
    }
    //finding the user with the help of id
    async findById(id){
        try {
            const user = await UserModel.findById(id).select('-password  -token').populate('posts');
            if(!user)
            {
                throw new ApplicationError("No user found by this id", 400);
            }
            return user;
        } catch (error) {
            console.log(error);
        }
 }
   async logoutAllDevices(userID){
    try{
       const user = await UserModel.findById(userID);
       if(!user){
         throw new Error("User not present in the db");
       }

       //delete all the tokens from the db
       user.token = [];
       await user.save();
       return   { message: "Logged out successfully from all devices" };
    }catch(err){
        console.log(err);
    }
   }
   async findAllUsers(){
     try{
        const users = await UserModel.find({}, {password: 0, token: 0}).populate('posts');
        if(users.length===0){
            throw new Error("No users found!!");
        }
        return users;
     }catch(err){
        console.log(err);
     }
   }
}