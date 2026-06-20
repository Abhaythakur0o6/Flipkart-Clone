const express = require("express");
const { SendOtp, VerifyOtp } = require("../controllers/otp-controller");
const router = express.Router()

//Send OTP
router.post("/send-otp", SendOtp);

//Verify OTP
router.post("/verify-otp", VerifyOtp);

module.exports = router