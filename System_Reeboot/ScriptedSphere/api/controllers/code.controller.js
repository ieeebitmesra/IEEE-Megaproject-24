import { errorHandler } from "../utils/error.js";

export const getContests = async (req,res,next) =>{    
    try {
        const r = await fetch("https://node.codolio.com/api/contest-calendar/v1/all/get-contests");
        const data =await r.json();
        if(!r.ok){
            return next(errorHandler(500,"Internal Server Error!!"));
        }
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

