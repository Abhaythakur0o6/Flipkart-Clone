const express = require("express")
const router = express.Router();
const paymentController = require("../controllers/payment-controller.js");
const auth = require("../middlewares/auth.js");


//Payment routes
router.get("/payment", paymentController.updatePaymentInformation)

router.post("/payment/:id", auth, paymentController.createPaymentLink)

module.exports = router