require("dotenv").config();
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const app = express();
const productRouter = require("./routes/productsRoute")
const paymentRouter = require("./routes/paymentRoute")
const orderRouter = require("./routes/orderRoute")
const userRouter = require("./routes/userRoute")
const OtpRouter = require("./routes/otpRoutes");
const defaultData = require("./default");

const PORT = process.env.PORT || 5000

//Middleware
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        process.env.CLIENT_URL,
        process.env.ADMIN_URL,
    ].filter(Boolean),
    credentials: true
}));
app.use(cookieParser())
app.use(express.json())

//Routers
app.use("/", productRouter)
app.use("/", paymentRouter)
app.use("/", orderRouter)
app.use("/", userRouter)
app.use("/", OtpRouter)

app.use("/", (req, res) => {
    res.send("server running fine")
})

//Error Handling
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).json({ success: false, message: err.message || "Something went wrong" })
})

//Connection to Database
const main = async () => {
    await mongoose.connect(process.env.MONGO_URL)
}
main().then(async () => {
    console.log("Connected to database")
}).catch((err) => {
    console.error(err)
})

app.listen(PORT, () => {
    console.log(`connected to port ${PORT}`)
})