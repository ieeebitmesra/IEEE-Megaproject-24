import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req,res,next) =>{
    const {username,email,password} = req.body;

    if(!username || !email || !password || username==='' || email==='' || password===''){
        return next(errorHandler(400,"All fields are required"));
    }
    const hashedPassword = bcrypt.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPassword});
    try {
        await newUser.save();
        res.json("Success!!!");
    } catch (error) {
        next(error);
    }
};

export const signin = async (req,res,next) =>{
    const {email,password} = req.body;

    if(!email || !password  || email==='' || password===''){
        return next(errorHandler(400,"All fields are required"));
    }
    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,"User not Found"));
        }
        const validPassword = bcrypt.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(400,"Wrong Credentials"));
        }
        const token = jwt.sign({id : validUser._id,isAdmin:validUser.isAdmin},process.env.JWT_SECRET);
        res.status(200).cookie('access_token',token,{
            httpOnly:true
        }).json(validUser);
    } catch (error) {
        return next(error);
    }
};

export const google = async (req,res,next) =>{
    const {name,email,googlePhotoUrl} =req.body;
    console.log(name);
    console.log(email);
    console.log(googlePhotoUrl);

    try {
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({id:user._id ,isAdmin:user.isAdmin},process.env.JWT_SECRET);
            res.status(200).cookie('access_token',token,{
                httpOnly:true,
            }).json(user);
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword,10);
            const newUser = new User({
                username:name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
                email,
                password:hashedPassword,
                profilePicture:googlePhotoUrl
            })
            await newUser.save();
            const token = jwt.sign({id:newUser._id,isAdmin:newUser.isAdmin},process.env.JWT_SECRET);
            res.status(200).cookie('access_token',token,{
                httpOnly:true,
            }).json(newUser);
        }
    } catch (error) {
        next(error);
    }
    
}