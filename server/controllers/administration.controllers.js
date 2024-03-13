const Administration = require("../models/administration_models");
const httpStatusText = require("../utils/httpStatusText.js");
const User = require("../models/user_models.js");
const asyncWrapper = require("../middlewares/asyncwrapper.js");
const appError = require("../utils/apperror.js");

const add_administ = asyncWrapper(async (req, res, next) => {
  const name = req.body.name;
  const adress = req.body.adress;
  const checkname = await Administration.findOne({ name: name });
  const checkmanager = await User.findOne({ matricule: req.body.manager });
  console.log(checkmanager);
  if (checkname) {
    const error = appError.create("existe deja", 404, httpStatusText.FAIL);
    return next(error);
  }
  if (!checkmanager) {
    const error = appError.create("user not found", 404, httpStatusText.FAIL);
    return next(error);
  }
  const manager = checkmanager._id;
  const newadministration = await new Administration({
    name,
    adress,
    manager,
  }).save();

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { Administration: newadministration },
  });
});

const get_all_administ = asyncWrapper(async (req, res, next) => {
  const adminst = await Administration.find({}, { __v: 0 });
  if (adminst.length == 0) {
    const error = appError.create(
      "no administration found",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }
  res.json({ status: httpStatusText.SUCCESS, data: adminst });
});

const get_one_administ = asyncWrapper(async (req, res, next) => {
  const nom = req.params.nom;
  const administ = await Administration.findOne({ nom: nom })
    .populate("cars")
    .populate({
      path: "employee",
      populate: { path: "drivers" },
      populate: { path: "companions" },
    });
  const administcheck = await Administration.findOne(
    { nom: nom },
    { _id: true }
  );

  if (!administcheck) {
    const error = appError.create(
      "administ dont exist",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }
  res.json({ status: httpStatusText.SUCCESS, data: { administ } });
});

module.exports = {
  add_administ,
  get_all_administ,
};
