const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post('/charge', controller.postCharge);
router.post('/customer', controller.createCustomer);
module.exports = router;
