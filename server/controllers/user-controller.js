const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const wrapAsync = require("../utils/wrapAsync");

//Helper Functions
const createAccessToken = (user) => {
    return jwt.sign(
        { _id: user._id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "20m" }
    );
};

const createRefreshToken = (user) => {
    return jwt.sign(
        { _id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
};


//Get Me Controller
module.exports.getMe = wrapAsync(async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        return res.status(401).json({ message: "Not authenticated" })
    }

    const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
    )

    const user = await User.findById(decoded._id)

    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({
        resUser: {
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username
        }
    })
})

//Signup Controller
module.exports.signup = wrapAsync(async (req, res) => {
    const { name, email, username, password, phone } = req.body

    const existingUser = await User.findOne({ $or: [{ email }, { username }, { phone }] });
    if (existingUser) {
        return res.status(409).json({ message: "User already Exists" })
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = new User({
        name: name,
        email: email,
        username: username,
        password: hashedPass,
        phone: phone
    })

    const savedUser = await user.save();

    const accessToken = createAccessToken(savedUser);
    const refreshToken = createRefreshToken(savedUser);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const resUser = {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        username: savedUser.username,
    }

    res.status(201).json({
        success: true,
        message: `${name} Welcome to FlipKart`,
        resUser,
        token: accessToken
    })
})

//Login Controller
module.exports.login = wrapAsync(async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return res.status(401).json({
            message: "Invalid email or password",
            success: false
        })
    }

    const verifyPass = await bcrypt.compare(password, existingUser.password)
    if (!verifyPass) {
        return res.status(401).json({
            message: "Invalid email or password",
            success: false
        })
    }

    const resUser = {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        username: existingUser.username,
    }

    const accessToken = createAccessToken(existingUser);
    const refreshToken = createRefreshToken(existingUser);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        message: `Welcome Back ${existingUser.name}`,
        success: true,
        resUser,
        token: accessToken
    })
})

//LogOut Route
module.exports.logOutUser = (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
    });
    res.status(200).json({ message: "Logged Out Successfully" })
}

//Refresh Token Route
module.exports.refreshToken = wrapAsync(async (req, res) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token" })
    }

    const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
    )

    const user = await User.findById(decoded._id)
    if (!user) {
        return res.status(401).json({ message: "User not found" })
    }

    const newAccessToken = createAccessToken(user)

    res.status(200).json({
        token: newAccessToken
    })
}) 