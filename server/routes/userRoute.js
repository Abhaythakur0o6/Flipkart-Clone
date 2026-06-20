const express = require("express")
const router = express.Router();
const { signup, login, getMe, refreshToken, logOutUser } = require("../controllers/user-controller");
const auth = require("../middlewares/auth");

//Get Me Route
router.get("/me", getMe)

// SignUp Route
router.post("/signup", signup)

// Login Route
router.post("/login", login)

//LogOut Route
router.post("/logout", logOutUser)

//Refresh Token
router.post("/refresh", refreshToken)

module.exports = router