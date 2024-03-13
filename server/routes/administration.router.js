const express = require("express");
const adminstcontroller = require("../controllers/administration.controllers");
const router = express.Router();

router.post("/add" ,adminstcontroller.add_administ);
router.get("/" ,adminstcontroller.get_all_administ);

module.exports = router;