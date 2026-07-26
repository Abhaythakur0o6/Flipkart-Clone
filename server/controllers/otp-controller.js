const https = require("https");
const transporter = require("../config/nodeMailer");
const Otp = require("../models/otp");
const crypto = require("crypto");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const wrapAsync = require("../utils/wrapAsync");

// Helper for Brevo HTTPS API
const sendBrevoHttpEmail = (apiKey, senderEmail, recipientEmail, otp) => {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify({
            sender: { email: senderEmail, name: "Flipkart Clone" },
            to: [{ email: recipientEmail }],
            subject: "Flipkart - Login OTP",
            htmlContent: `<h2>Your OTP is ${otp}</h2><p>Valid for 5 minutes</p>`
        });

        const req = https.request("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "api-key": apiKey,
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(payload)
            },
            timeout: 10000
        }, (res) => {
            let body = "";
            res.on("data", chunk => body += chunk);
            res.on("end", () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(body);
                } else {
                    reject(new Error(`Brevo API error (${res.statusCode}): ${body}`));
                }
            });
        });

        req.on("error", reject);
        req.on("timeout", () => { req.destroy(); reject(new Error("Brevo API timeout")); });
        req.write(payload);
        req.end();
    });
};

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
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    await Otp.create({
        userId: existingUser._id,
        otpHash,
        expiresAt: Date.now() + 5 * 60 * 1000
    });

    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.SENDER_EMAIL || normalizedEmail;

    try {
        if (apiKey) {
            // Production (Docker on Render): Uses Brevo HTTPS API with xkeysib API key
            await sendBrevoHttpEmail(apiKey, senderEmail, normalizedEmail, otp);
        } else {
            // Localhost: Uses Nodemailer SMTP
            await transporter.sendMail({
                from: senderEmail,
                to: normalizedEmail,
                subject: "Flipkart - Login OTP",
                html: `<h2>Your OTP is ${otp}</h2><p>Valid for 5 minutes</p>`
            });
        }
    } catch (err) {
        console.error("OTP Delivery Error:", err.message);
        return res.status(500).json({ success: false, message: err.message || "Failed to send OTP email." });
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