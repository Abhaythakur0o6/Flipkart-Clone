const Otp = require("../models/otp");
const crypto = require("crypto");
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

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (!existingUser) {
        return res.status(404).json({ success: false, message: "User does not exist. Please sign up first." });
    }

    await Otp.deleteMany({ userId: existingUser._id });

    const otp = crypto.randomInt(100000, 999999).toString();

    const otpHash = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");

    await Otp.create({
        userId: existingUser._id,
        otpHash,
        expiresAt: Date.now() + 5 * 60 * 1000
    });

    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "api-key": process.env.BREVO_API_KEY || process.env.SMTP_PASS,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                sender: { email: process.env.SENDER_EMAIL || normalizedEmail, name: "Flipkart Clone" },
                to: [{ email: normalizedEmail }],
                subject: "Flipkart - Login OTP",
                htmlContent: `<h2>Your OTP is ${otp}</h2><p>Valid for 5 minutes</p>`
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Brevo API error response:", data);
            return res.status(500).json({ success: false, message: data.message || "Failed to send email." });
        }
    } catch (err) {
        console.error("Error connecting to Brevo API:", err);
        return res.status(500).json({ success: false, message: "Email service connection error." });
    }

    return res.status(200).json({ success: true, message: "OTP sent successfully" });
});


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