const mongoose = require("mongoose");
const User = require("./user_models");
const Employee = require("./employee_models");

const companionSchema = new mongoose.Schema(
  {},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

companionSchema.virtual("missions", {
  ref: "mission",
  localField: "_id",
  foreignField: "companion",
});

User.discriminator("companion", companionSchema);
module.exports = mongoose.model("companion");
