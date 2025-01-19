import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'

export  const test = (req,res)=>{
    res.json({message :"API is working"});
};

export const updateUser = async (req,res,next) => {    

    if(req.user.id !== req.params.userId){
        return next(errorHandler(403,"You are not allowed to update this user !!!"));
    }
    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler(400,'Password must be atleast 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password,10);
    }
    if (req.body.username) {
        if(req.user.username.length < 3 || req.body.username.length >20){
            return next(errorHandler(400,'Username must be less than 20 or greater than 2 characters'));
        } 
        if(req.user.username.includes(' ')){
            return next(errorHandler(400, "Username cannot contain spaces"));
        }
        if(!req.user.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400, "Username can only contain letters or numbers"));
        }
    }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
                $set:req.body,
            },{new : true});
            
            const {password , ...rest} = updatedUser._doc;
            // console.log(rest);
            

            res.status(200).json(rest);

        } catch (error) {
            next(error);
        }   
}

export const deleteUser =async (req,res,next)  =>{
    const {userId} = req.params;

    try {
        if (!userId) {
            return next(errorHandler(400,'User id required'));
        }
        const user =await User.findById(userId);
        
        if(!user){
            return next(errorHandler(404,'No user found!!!'));
        }
        if(req.user.id!==userId && !req.user.isAdmin){
            return next(errorHandler(403,'You can only delete your own accound .'));
        }
        await User.findByIdAndDelete(userId);
        
        res.status(200).json("User has been deleted");
        
    } catch (error) {
        next(error
        )
    }
}
export const signOutUser = async (req,res,next) => {
    try {
        res.clearCookie('access_token').status(200).json("User has been signed out");
    } catch (error) {
        next(error);
    } 
}

export const getUsers = async (req,res,next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403,"Unauthorized"));
    }
    try {
        // const startIndex = parseInt(req.query.startIndex) || 0;
        // const limit = parseInt(req.query.limit)
        const users = await User.find();

        // const userWithoutPassword = users.map((user) => {
        //     const {password,...rest} = user._doc;
        // });
        const totalUsers = await User.countDocuments();

        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            
        const lastMonthUsers = await User.countDocuments({
            createdAt:{$gte:oneMonthAgo},
        })
        res.status(200).json({
            users,
            totalUsers,lastMonthUsers
        });

    } catch (error) {
        next(error);
    }
}