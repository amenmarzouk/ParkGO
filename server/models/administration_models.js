const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const administrationSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
    },
    Adress: {
      type: String,
    },
    Manager: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },

  { timestamps: true }
);
administrationSchema.virtual("cars", {
  ref: "car",
  localField: "_id",
  foreignField: "adminisatration",
});

administrationSchema.virtual("missions", {
  ref: "mission",
  localField: "_id",
  foreignField: "administration",
});
administrationSchema.virtual("companions", {
  ref: "companion",
  localField: "_id",
  foreignField: "administration",
});
administrationSchema.virtual("drivers", {
  ref: "driver",
  localField: "_id",
  foreignField: "administration",
});

module.exports = mongoose.model("administration", administrationSchema);
