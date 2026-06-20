const transporter = require("../config/nodeMailer");
const Otp = require("../models/otp");
const crypto = require("crypto")
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const wrapAsync = require("../utils/wrapAsync");

//Send OTP
module.exports.SendOtp = wrapAsync(async (req, res) => {
    const { email } = req.body;

    const existingUser = await User.findOne({ email })
    if (!existingUser) {
        return res.status(404).json({ success: false, message: "user does not exist" })
    }

    await Otp.deleteMany({ userId: existingUser._id })

    const otp = crypto.randomInt(100000, 999999).toString();

    const otpHash = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex")

    await Otp.create({
        userId: existingUser._id,
        otpHash,
        expiresAt: Date.now() + 5 * 60 * 1000
    })

    await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Flipkart - Login OTP",
        html: `<h2>Your OTP is ${otp}</h2><p>Valid for 5 minutes</p>`
    })

    return res.status(200).json({ success: true, message: "OTP sent successfully" })
})


//Verify OTP
module.exports.VerifyOtp = wrapAsync(async (req, res) => {
    const { email, otp } = req.body
    const existingUser = await User.findOne({ email })

    if (!existingUser) {
        return res.status(404).json({ success: false, message: "User does not exists" })
    }

    const otpRecord = await Otp.findOne({
        userId: existingUser._id,
        expiresAt: { $gt: Date.now() }
    })

    if (!otpRecord) {
        return res.status(400).json({ success: false, message: "OTP expired or invalid" })
    }

    const otpHash = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex")

    if (otpHash !== otpRecord.otpHash) {
        return res.status(400).json({ success: false, message: "Incorrect Otp" })
    }

    await Otp.deleteMany({ userId: existingUser._id })

    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    return res.status(200).json({
        success: true, message: "Login Successfull", token, resUser: {
            _id: existingUser._id,
            email: existingUser.email,
            name: existingUser.name,
            username: existingUser.username
        }
    })
}) 