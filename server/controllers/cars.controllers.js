const Car = require("../models/cars_models.js");
const httpStatusText = require("../utils/httpStatusText.js");
const asyncWrapper = require("../middlewares/asyncwrapper.js");
const appError = require("../utils/apperror.js");
const Mission = require("../models/mission_models.js");
const { VirtualType } = require("mongoose");
const Administration = require("../models/administration_models.js");
/* const validation=require("../middlewares/validation.middelwares.js")
const carshema=require("../validations/carvalidation.js") */
///liste des voiture

const get_cars = asyncWrapper(async (req, res, next) => {
  const cars = await Car.find({}, { __v: 0 });
  if (cars.length == 0) {
    const error = appError.create("no cars found", 404, httpStatusText.FAIL);
    return next(error);
  }
  res.json({ status: httpStatusText.SUCCESS, data: cars });
});

////consulter voiture
///axios
const get_one_car = asyncWrapper(async (req, res, next) => {
  const carREG = req.params.regisNB;
  const car = await Car.findOne({ regisNB: carREG }).populate("missions administration");

  const carcheck = await Car.findOne({ regisNB: carREG }, { _id: true });

  if (!carcheck) {
    const error = appError.create("car dont exist", 404, httpStatusText.FAIL);
    return next(error);
  }
  /*   const checkmiss=await Mission.find({car:carid})
  console.log(checkmiss)
  if(checkmiss){
const mission=checkmiss
 car.missions=mission
  } */

  res.json({ status: httpStatusText.SUCCESS, data: { car } });
});

//histoy mision
const get_hist_car = asyncWrapper(async (req, res, next) => {
  /*   const carREG = req.params.regisNB;
  const car = await Car.findOne({regisNB:carREG},{missions:true},{__id:false}).populate("missions");

  const carcheck = await Car.findOne({regisNB:carREG},{_id:true} );
 
  if (!carcheck) {
    const error = appError.create("car dont exist", 404, httpStatusText.FAIL);
    return next(error); 
   } */
  const carid = await Car.findOne({ regisNB: req.params.regisNB }, { _id: 1 });
  console.log(carid);
  const checkmiss = await Mission.find({ car: carid });
  console.log(checkmiss);

  res.json({ status: httpStatusText.SUCCESS, data: { missions: checkmiss } });
});

//get avaible car
const get_avaible_car = asyncWrapper(async (req, res, next) => {
  const car = await Car.find({ dispo: true }, { __v: 0 });

  if (car.length == 0) {
    const error = appError.create("no avaible cars", 404, httpStatusText.FAIL);
    return next(error);
  }
  res.json({ status: httpStatusText.SUCCESS, car });
});

//ajouter voiture

const add_car_contoller = asyncWrapper(async (req, res, next) => {
  const regisNB = req.body.regisNB;
  const location = req.body.location;
  const dispo = req.body.dispo;

  const checkadministration = await Administration.findOne({
    name: req.body.administration,
  });
  console.log(checkadministration);
  const administration = checkadministration._id;
  const check = await Car.findOne({ regisNB: regisNB });
  if (check) {
    const error = appError.create("existe deja", 404, httpStatusText.FAIL);
    return next(error);
  }
  const newcar = await new Car({
    regisNB,
    location,
    dispo,
    administration,
  }).save();
  /*   const findid=await Car.find({regisNB:req.body.regisNB},{"_id":true})
  const checkmiss=await Mission.find({car:findid})
  if(checkmiss){
 var mission=checkmiss
  }
console.log(checkmiss) */
  /*  
 const newcar=new Car({
regisNB,
location,
dispo
  }).save(); */

  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { car: newcar } });
});

//modifier voiture
const update_car = asyncWrapper(async (req, res, next) => {
  const carid = await Car.findOne(
    { regisNB: req.params.regisNB },
    { _id: true }
  );

  const updatedcar = await Car.updateOne(
    { _id: carid },
    {
      $set: { ...req.body },
    }
  );
  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { car: updatedcar } });
});

//supprimer voiture
const delete_car = asyncWrapper(async (req, res, next) => {
  const carREG = req.params.regisNB;
  const carid = await Car.findOne({ regisNB: carREG }, { _id: true });
  console.log(carREG);
  await Car.deleteOne({ _id: carid });
  return res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  add_car_contoller,
  get_cars,
  get_one_car,
  get_avaible_car,
  update_car,
  delete_car,
  get_hist_car,
};
