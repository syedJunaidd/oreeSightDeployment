const express = require("express");
const controller = require("./blackListTokens.controller");
const auth = require("../../../auth/auth.service");
const router = express.Router();


router.post("/logout", controller.create);

module.exports = router;

