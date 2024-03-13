const mongoose = require("mongoose");
const userRoles = require("../utils/userRoles");
const ObjectId = mongoose.Schema.Types.ObjectId;
const userSchema = new mongoose.Schema(
  {
 
    Name: {
      type: String,
      required: true,
      trim: true,
    },
      LastName: {
      type: String,
      required: true,
      trim: true,
    },
    Matricule: {
      type: String,
    },
    Password: {
      type: String,
      required: true,
    },
    NumTEL: {
      type: String,
      required: true,
      minlenght: 8,
      maxlength: 8,
     
    },
    Administration:{
      type: ObjectId,
      ref: "administration",
    
    },
    Role: {
      type: String,
      enum: [userRoles.ADMIN, userRoles.MANAGER,userRoles.DRIVER,userRoles.COMPANION],
      
    },
    Approved:{
    type:Boolean,
    default:false
    },

    token: {
      type: String,
    },
  },
  { discriminatorKey: 'emp',
  
   },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
