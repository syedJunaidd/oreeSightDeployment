const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get('/customerById', controller.customerById);
router.get('/productById', controller.productById);
router.get('/customerPaymentMethods', controller.customerPaymentMethods);
router.post('/createCard', controller.createCard);
router.post('/createSubscription', controller.createSubscription);
router.get('/userInvoiceList', controller.stripeUserInvoiceList);
router.put('/cancelUserSubscription', controller.stripeCancelUserSubscription);
router.post('/createPrice', controller.createPrice);
router.post('/createPlan', controller.createPlan);
router.delete('/deleteSubscription', controller.deleteSubscription);
router.get('/planList', controller.planList);
router.get('/planById', controller.planById);
router.post('/attachPaymentMethodToCustomer', controller.attachPaymentMethodToCustomer);
router.get('/subscriptionsList', controller.subscriptionsList);

module.exports = router;
