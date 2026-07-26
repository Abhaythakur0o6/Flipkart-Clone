const transporter = require("../config/nodeMailer");
const Otp = require("../models/otp");
const crypto = require("crypto")
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const wrapAsync = require("../utils/wrapAsync");

//Send OTP
module.exports.SendOtp = wrapAsync(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail })
    if (!existingUser) {
        return res.status(404).json({ success: false, message: "User does not exist. Please sign up first." })
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

    try {
        await transporter.sendMail({
            from: process.env.SENDER_EMAIL || normalizedEmail,
            to: normalizedEmail,
            subject: "Flipkart - Login OTP",
            html: `<h2>Your OTP is ${otp}</h2><p>Valid for 5 minutes</p>`
        })
    } catch (err) {
        console.error("Nodemailer sendMail Error:", err);
        return res.status(500).json({ success: false, message: err.message || "Failed to send OTP email." });
    }

    return res.status(200).json({ success: true, message: "OTP sent successfully" })
})


//Verify OTP
module.exports.VerifyOtp = wrapAsync(async (req, res) => {
    const { email, otp } = req.body

    if (!email || !otp) {
        return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail })

    if (!existingUser) {
        return res.status(404).json({ success: false, message: "User does not exist" })
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

    const accessToken = jwt.sign({ _id: existingUser._id, role: existingUser.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" })
    const refreshToken = jwt.sign({ _id: existingUser._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
        success: true, message: "Login Successfull", token: accessToken, resUser: {
            _id: existingUser._id,
            email: existingUser.email,
            name: existingUser.name,
            username: existingUser.username
        }
    })
})