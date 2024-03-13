const mongoose = require("mongoose");

const Employee = require("./employee_models");
const User = require("./user_models");

const managerSchema = new mongoose.Schema({});

User.discriminator("manager", managerSchema);
module.exports = mongoose.model("manager");
