const mongoose = require("mongoose");
var validator = require("validator");
const ObjectId = mongoose.Schema.Types.ObjectId;

const carSchema = new mongoose.Schema(
  {
    regisNB: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    location: {
      type: String,

      trim: true,
    },
    dispo: {
      type: Boolean,
    default:true
    },
    administration: {
      type: ObjectId,
      ref: "administration",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },

  { timestamps: true }
);
carSchema.virtual("missions", {
  ref: "mission",
  localField: "_id",
  foreignField: "car",
});
module.exports = mongoose.model("car", carSchema);
