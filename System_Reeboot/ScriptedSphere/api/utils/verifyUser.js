import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
import User from '../models/user.model.js';

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(errorHandler(401,'Unauthorized Request'));
    } 
    
    jwt.verify(token,process.env.JWT_SECRET,async (err,decodedToken) => {
        if(err){
            return next(errorHandler(401,'Unauthorized Request'));
        }

        const user = await User.findById(decodedToken.id);
            if (!user) {
                return next(errorHandler(404, 'User not found'));
            }
        
        req.user = user;
        next();
    });
}
