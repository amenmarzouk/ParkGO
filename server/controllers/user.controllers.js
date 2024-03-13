const User = require("../models/user_models.js");
const asyncWrapper = require("../middlewares/asyncwrapper.js");
const appError = require("../utils/apperror.js");
const httpStatusText = require("../utils/httpStatusText.js");
const bcrypt = require("bcrypt");
const generateJWT = require("../utils/generateJWT.js");
const Administrationn = require("../models/administration_models.js");
const Driver = require("../models/driver_models.js");

//signup utlisateur
const registre = asyncWrapper(async (req, res, next) => {
  const Name = req.body.Name;
  const LastName = req.body.LastName;
  const Matricule = req.body.Matricule;
  const Role = req.body.Role;
  const NumTEL = req.body.NumTEL;
  const Password = req.body.Password;
  const licenceNB = req.body.licenceNB;

  const hashedPassword = await bcrypt.hash(Password, 10);
  const oldusermatricule = await User.findOne({ Matricule: Matricule });

  const checkadminist = await Administrationn.findOne({
    name: req.body.Administration,
  });
  const Administration = checkadminist._id;

  if (oldusermatricule) {
    const error = appError.create("user existe deja", 409, httpStatusText.FAIL);
    return next(error);
  }

  const newuser = new User({
    Name,
    LastName,
    Matricule,
    Administration,
    Role,
    NumTEL,
    Password: hashedPassword,
  });
  const token = await generateJWT({
    Matricule: newuser.Matricule,
    Role: newuser.Role,
    Approved: newuser.Approved,
    _id: newuser._id,
  });
  newuser.token = token;
  await newuser.save();

  if (newuser.Role == "Driver") {
    const driver = await new Driver({
      ...newuser.toJSON(),
      licenceNB,
    }).save();

    res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { user: driver } });
  }

  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { user: newuser } });
});

//sign in utlisateur
const signin = asyncWrapper(async (req, res, next) => {
  const { Matricule, Password } = req.body;
  const user = await User.findOne({ Matricule: Matricule });
  console.log(user);
  if (!Matricule || !Password) {
    const error = appError.create(
      "please provide login data",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }
  if (!user) {
    const error = appError.create("user dont exist", 400, httpStatusText.FAIL);
    return next(error);
  }

  const finalCIN = await bcrypt.compare(Password, user.Password);

  if (!finalCIN) {
    const error = appError.create("CIN is wrong", 400, httpStatusText.FAIL);
    return next(error);
  }
  if (!user.Approved) {
    const error = appError.create(
      "User not Approved",
      403,
      httpStatusText.FAIL
    );
    return next(error);
  }
  /* user.CIN=undefined */
  const token = await generateJWT({
    Matricule: user.Matricule,
    Role: user.Role,

    _id: user._id,
  });
  res.status(201).send({ status: httpStatusText.SUCCESS, data: { token } });
});

//consulter tous les utlisateur
const get_users_list = asyncWrapper(async (req, res, next) => {
  const users = await User.find();
  if (users.length == 0) {
    const error = appError.create(
      "there is no users",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }
  res.status(201).json({ status: httpStatusText.SUCCESS, data: { users } });
});

//approve user
const notapproved_users = asyncWrapper(async (req, res, next) => {
  const users = await User.find({Approved:false});
  if (users.length == 0) {
    const error = appError.create(
      "there is no users to approve",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }
  res.status(201).json({ status: httpStatusText.SUCCESS, data: { users } });
});



//approve user
const approve_user = asyncWrapper(async (req, res, next) => {
  const matricule = await User.findOne(
    { Matricule: req.params.Matricule }
   
  );

  const approveduser = await User.updateOne(
    { _id: matricule._id },
    {
      $set: { ...req.body },
    }
  );
  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { user: approveduser } });
});

//modifier utlisateur
//supprimer utlisateur
//rechercher utilisatur
// logout
module.exports = {
  registre,
  signin,
  get_users_list,
  approve_user
};
