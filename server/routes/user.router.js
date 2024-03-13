const express = require("express");
const usercontroller = require("../controllers/user.controllers.js");
const verifyTOKEN = require("../middlewares/verifyTOKEN.js");
const AllowedTO = require("../middlewares/AllowedTO.js");
const userRoles = require("../utils/userRoles.js");
const router = express.Router();




router.get("/", verifyTOKEN,AllowedTO(userRoles.ADMIN),usercontroller.get_users_list);
router.post("/signin", usercontroller.signin);
router.post("/registre", usercontroller.registre);
router.post("/approve/:Matricule", usercontroller.approve_user);



/* router.route("/auth")
                .get( usercontroller.registre)
                .post( usercontroller.signin) */




            
module.exports = router;
