const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const missionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please add name"],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, "please add destination"],
    },
    date: {
      type: Date,
      required: [true, "please add email"],
    },
    status: {
      type: String,
      required: [true, "please add status"],
    },
    driver: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
    car: {
      type: ObjectId,
      ref: "car",
      required: true,
    },
    administration: {
      type: ObjectId,
      ref: "administration",
      
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);
missionSchema.virtual("companions", {
  ref: "companion",
  localField: "_id",
  foreignField: "administration"
});
module.exports = mongoose.model("mission", missionSchema);
