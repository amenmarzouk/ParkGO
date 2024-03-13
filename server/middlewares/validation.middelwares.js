const asyncWrapper = require("../middlewares/asyncwrapper.js");

const validation = (schema) => asyncWrapper(async (req, res, next) => {
  const body = req.body;
 
    await schema.validate(body);
    next();

})

module.exports = validation;
