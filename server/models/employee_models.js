/* const mongoose = require("mongoose");
const User = require("./user_models");
const ObjectId = mongoose.Schema.Types.ObjectId;
const { Schema } = require("mongoose");
const employeeshema = new Schema(
  {
    administration: {
      type: ObjectId,
      ref: "administration",
    },
  },
  { discriminatorKey: "role" }
);

User.discriminator("employee", employeeshema);

const roleschema = Schema({ role: employeeshema });
roleschema.path("role").discriminator(
  "driver",
  Schema({
    licenceNB: {
      type: String,
    },
  })
);
roleschema.path("role").discriminator("manager", Schema({}));
roleschema.path("role").discriminator("companion", Schema({}));

module.exports = mongoose.model("employee");
 */