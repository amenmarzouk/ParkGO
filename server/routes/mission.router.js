const express = require("express");
const missioncontroller = require("../controllers/mission.controller.js");
const router = express.Router();





router.post("/addmission", missioncontroller.add_mission);
router.patch("/updatemission/:missid", missioncontroller.update_mission);
router.patch("/updatemissionstatus/:missid", missioncontroller.update_mission_status);
router.get("/", missioncontroller.get_all_mission);
router.get("/:missid", missioncontroller.get_mission);




/*router.route("/")
                .get()
                .post()*/




            
module.exports = router;