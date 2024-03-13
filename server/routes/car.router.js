const express = require("express");
const carcontroller = require("../controllers/cars.controllers.js");
const carshema=require("../validations/carvalidation.js")
const validation=require("../middlewares/validation.middelwares.js")
const router = express.Router();


router.get("/" ,carcontroller.get_cars);
router.get("/avaible" ,carcontroller.get_avaible_car);
router.get("/history/:regisNB" ,carcontroller.get_hist_car);
router.patch("/update/:regisNB" ,carcontroller.update_car);
router.delete("/delete/:regisNB" ,carcontroller.delete_car);
router.get("/:regisNB" ,carcontroller.get_one_car);
router.post("/add" ,carcontroller.add_car_contoller);








module.exports = router;