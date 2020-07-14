const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getToken, processPayment } = require("../controllers/braintreepayment");

router.get("/payment/gettoken/:userId", isSignedIn, getToken);

router.post("/payment/braintree/:userid", isSignedIn, processPayment);

module.exports = router;
