import express from "express";
import UserController from "./userController.js";
import jwtAuth from "../../middlewares/jwt.Middleware.js";

//intializing user router
const userRouter = express.Router();
 
//userController object to access user functions
const userController = new UserController();

//user signup Route
userRouter.post('/signup', (req,res,next)=>{
    userController.SignUp(req,res,next);
});
userRouter.post('/signin',(req,res,next)=>{
    userController.SignIn(req,res,next);
});
// Log out the currently logged-in user.
userRouter.get('/logout', jwtAuth, (req,res,next)=>{
    userController.userLogout(req,res,next);
});
//Log out from all the devices 
userRouter.get('/logoutAllDevices',jwtAuth,(req,res,next)=>{
    userController.LogOutFromAllDevices(req,res,next);
});
//get user details 
userRouter.get('/get-details/:userId', jwtAuth, (req,res,next)=>{
    userController.GetUserDetails(req,res,next);
});
//user route to get all users
userRouter.get('/getAllUsers', (req,res,next)=>{
    userController.getAllUsers(req,res,next);
});

export default userRouter;