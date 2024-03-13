const appError = require("../utils/apperror");

module.exports = (roles) => {    
    return (req, res, next) => {
        console.log(roles);
        if(!roles.includes(req.currentUser.Role)) {
            return next(appError.create('this role is not authorized', 401))
        }
        next();
    }
}