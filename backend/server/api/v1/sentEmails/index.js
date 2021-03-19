// "use strict";;

const express = require("express");
const controller = require("./sentEmails.controller");
const router = express.Router();

// add subscriber

router.get("/:token", controller.GetEmail);



module.exports = router;
