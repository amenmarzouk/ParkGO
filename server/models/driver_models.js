const mongoose = require("mongoose");
const Employee = require("./employee_models");
const User = require("./user_models");
const extendSchema = require("mongoose-extend-schema");

const driverShema = new mongoose.Schema(
  {
    licenceNB: {
      type: String,
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },

  { timestamps: true },
  { discriminatorKey: "emp" },
  { collection: "drivers" }
);

driverShema.virtual("missions", {
  ref: "mission",
  localField: "_id",
  foreignField: "driver",
});
User.discriminator('driver', driverShema);

const DriverModel = mongoose.model('driver',"drivers");


module.exports = DriverModel
