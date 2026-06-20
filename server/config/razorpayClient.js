const Razorpay = require("razorpay")

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_APIKEY,
    key_secret: process.env.RAZORPAY_SECRET
});

module.exports = instance