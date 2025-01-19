import JWT from "jsonwebtoken";
import usermodel from "../models/usermodel.js";


//protected routes

import jwt from 'jsonwebtoken';

export const requireSignIn = async (req, res, next) => {
  try {
    // Check if the Authorization header is present
    const authorizationHeader = req.headers.authorization;

    // Check if the token is available in the Authorization header
    if (!authorizationHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authorizationHeader.split(' ')[1];

    // If the token is available in the local storage, you can use it directly
    // const token = localStorage.getItem('token');

    if (!token) {
      return res.status(401).json({ error: 'Token not available in local storage' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);

    // Handle different types of JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }

    // For other errors, you can send a generic 500 status
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//wholeseller acess
 export const isWholeseller =async(req,res,next)=>{
    try {
        const user = await usermodel.findById(req.user._id)
        if(user.role === "1"){
            return res.status(200).send({
                success:true,
                message:"you are wholeseller"
            })
        }else{
            next()
        }
    } catch (error) {
        console.log(error);
        res.send(401).send({
            success:false,
            error,
            message:'error in admin middleware'
        })

    }
    }


  //  farmer acess

 export const isFarmer =async(req,res,next)=>{
    try {
        const user = await usermodel.findById(req.user._id)
        if(user.role === "0"){
            return res.status(200).send({
                success:true,
                message:"you are a farmer"
            })
        }else{
            next()
        }
    } catch (error) {
        console.log(error);
        res.send(401).send({
            success:false,
            error,
            message:'error in admin middleware'
        })

    }
    }
 