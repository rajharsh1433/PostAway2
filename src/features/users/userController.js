import bcrypt from 'bcrypt';
import UserRepository from './userModel.js';
import jwt from 'jsonwebtoken';
import { UserModel } from './userSchema.js';
import dotenv from 'dotenv';


//user controller class
export default class UserController {
    //constructor to intialize user repository
    constructor()
    {
        this.userRepository = new UserRepository();
    }

    //sign up functionality
    async SignUp(req, res, next) {
        try {
            const { name, email, password, gender } = req.body; // Destructure req.body correctly
    
            // Check if all required fields are provided
            if (!name || !email || !password || !gender) {
                return res.status(400).send("All fields are required");
            }
    
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 12);
    
            // Check if user already exists (assuming there's a method for this)
            // const existingUser = await this.userRepository.findUserByEmail(email);
            // if (existingUser) {
            //     return res.status(400).send("User already exists");
            // }
    
            // Create user object
            const user = { name, email, password: hashedPassword, gender };
    
            // Save new user to the database
            const newUser = await this.userRepository.signUp(user);
            if (!newUser) {
                return res.status(400).send("Cannot create new user");
            }
    
            // Send success response
            return res.status(201).json({
                success: true,
                user: newUser,
                msg: "New user added successfully."
            });
        } catch (err) {
            console.log("Cannot Create User: " + err);
            return res.status(500).send("Server error");
        }
    }

    async SignIn(req,res,next){
        try{
        const {email , password} = req.body;
        // Check for missing email or password.
        if (!email) {
            throw new ApplicationError("Please enter email", 400);
        } else if (!password) {
            throw new ApplicationError("Please enter password", 400);
        }
        //finding user witht the help of email
        const user = await this.userRepository.findByEmail(email);
        if(!user){
            return res.status(400).json({
                success: false,
                msg: "Invalid Credentials"
            });
        }
        //compare password with hashed password
        const passwordMatch = await bcrypt.compare(password,user.password);

        if(passwordMatch){
            //creating jwt token
           const token = jwt.sign(
            {userID:user._id,email:user.email},
            process.env.JWT_SECRET_KEY,
            {expiresIn: '1h'}
           );
           //saving token
           user.token = token;
           await user.save();
           // Send token in response upon successful login.
           return res.status(200).json({
            success: true,
            msg: "User sign-in successful",
            token: token
        });
    }else{
            return res.status(400).json({
                success: false,
                msg: "Cannot sign-in user",
            })
        }
        }catch(err){
            console.log("User sign-in failed"+err);
        }
    }

    async userLogout(req,res,next){
        try{
          const token = req.headers.authorization.replace("Bearer", "");
            return res.status(200).json({
                success: true,
                message: "Successfully logged out!!Thank you!!"
            });
        }catch(err){
            console.log("Cannot logout from the application"+err);
        }
    }
    async LogOutFromAllDevices(req,res,next){
        try{
            const userId = req.userID;
            console.log(userId);

            const result = await this.userRepository.logoutAllDevices(userId);
            if(!result){
                throw new Error("Something went wrong!!Cannot logout from all Devices");
            }
            return res.status(200).json({
                success:true,
                message: "Successfully logged out from all the Devices!!"
            });    
        }catch(err){
            console.log(err);
        }
    }
    async GetUserDetails(req,res,next){
        try{
        const id = req.params.userId;
        console.log(id);
        if(!id){
            throw new Error("Id not found!!");
        }
        const user = await this.userRepository.findById(id);
        if(!user){
            throw new Error("User not found!!");
        }
        res.status(200).json({
            success:true,
            user: user,
            mssg: "User found!!"
        });
    }catch(err){
        console.log("Unable to Fetch User Details!!");
        console.log(err);
    }
    }
    async getAllUsers(req,res,next){
        try{
            const users = await this.userRepository.findAllUsers();
            if(!users){
                throw new Error("No users are there in the system");
            }
            return res.status(200).json({
                success:true,
                users:users,
                mssg:"Users fetched"
            });
        }catch(err){
            console.log(err);
        }
    }
    
      
}