const Mission = require("../models/mission_models.js");
const Car = require("../models/cars_models.js");
const httpStatusText = require("../utils/httpStatusText.js");
const asyncWrapper = require("../middlewares/asyncwrapper.js");
const appError = require("../utils/apperror.js");
const User = require("../models/user_models.js");


//get users not match ADMIN OR MAANGER
/* await Story.
  find().
  populate({
    path: 'fans',
    match: { age: { $gte: 21 } },
    // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
    select: 'name -_id'
  }).
  exec(); */


  
  //ajouter mission
const add_mission = asyncWrapper(async (req, res, next) => {
  const checkcar = await Car.findOne({ regisNB: req.body.car} );
  const iduser = await User.findOne({ Matricule: req.body.driver });
  const title = req.body.title;
  const destination = req.body.destination;
  const date = req.body.date;
  const status = req.body.status;
  const driver = iduser._id;
  const car = checkcar._id;

  /*  const {titre,destination,date,status,matcar}=req.body */
  /*   const newmission = await new Mission(req.body).save();  */
  if (!checkcar) {
    const error = appError.create("car d'ont exist", 404, httpStatusText.FAIL);
    return next(error);
  }
  if (!iduser) {
    const error = appError.create("user d'ont exist", 404, httpStatusText.FAIL);
    return next(error);
  }
  const newmission = await new Mission({
    title,
    destination,
    status,
    date,
    car,
    driver,
  }).save();
  console.log(newmission);

  /* const update=await Mission.updateOne({matcar:req.body.matcar},{$set:{matcar: idcar}})
  console.log(update) */

  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { mission: newmission } });
});

//consulter 1 mission
const get_mission = asyncWrapper(async (req, res, next) => {
  const missid = req.params.missid;
  const mission = await Mission.findById(missid).populate("driver car");
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { mission: mission } });
});

// consulter tous les missions
const get_all_mission = asyncWrapper(async (req, res, next) => {
  const missions = await Mission.find().populate("driver car");
  if (missions.length == 0) {
    const error = appError.create(
      "no missions found !",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }
  res.status(201).json({ status: httpStatusText.SUCCESS, data: missions });
});

//modifier status mission
const update_mission_status = asyncWrapper(async (req, res, next) => {
  const missionid = req.params.missid;
  const updatedmission = await Mission.updateOne(
    { _id: missionid },
    {
      $set: { ...req.body.status },
    }
  );
  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { mission: updatedmission },
  });
});

//modifier mission
const update_mission = asyncWrapper(async (req, res, next) => {
  const missionid = req.params.missid;
  const updatedmission = await Mission.updateOne(
    { _id: missionid },
    {
      $set: { ...req.body },
    }
  );
  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { mission: updatedmission },
  });
});

module.exports = {
  add_mission,
  get_mission,
  get_all_mission,
  update_mission,
  update_mission_status,
};
