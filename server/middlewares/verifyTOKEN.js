const jwt=require("jsonwebtoken")
const httpStatusText=require("../utils/httpStatusText")
const appError = require("../utils/apperror.js");

const verifyTOKEN=(req,res,next)=>{
    const authHEADER=req.headers["Authorization"] || req.headers["authorization"]
    if (!authHEADER){
        const error = appError.create("token is required", 400, httpStatusText.FAIL);
        return next(error);
    }
    const token=authHEADER.split(" ")[1]
    try {
       const currentUser= jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.currentUser = currentUser;
        next()
    } catch (error) {
        const err = appError.create("invalid token", 400, httpStatusText.ERROR);
        return next(err);
    }

 
} 

module.exports =verifyTOKEN