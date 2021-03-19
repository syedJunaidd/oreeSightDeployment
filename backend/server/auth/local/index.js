// "use strict";;

const express = require("express");
const passport = require("passport");
const auth = require("../auth.service");
const router = express.Router();
var Stripe = require("../../api/v1/stripe/controller");

router.post("/", (req, res, next) => {
  passport.authenticate("local", async(err, user, info) => {
    try {
      const error = err || info;
      if (error) return res.status(401).json({
        code: 401,
        message: "Unauthorized"
      });
      if (!user) return res.sendStatus(404);
      const customer = await Stripe.getCustomerById(user.customer_id);
      if (!customer) throw new Error('Customer retrieval error');
      const paymentMethods = await Stripe.getCustomerPaymentMethods(user.customer_id);
      const token = auth.signToken(user._id, user.role);
      res.status(200).json({
        user,
        paymentMethods,
        customer,
        access_token: token,
        expires_in: '5h',
        permissions: user.permissions,
        _id: user._id
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  })(req, res, next);
});

module.exports = router;
