const express = require("express")
const router = express.Router();
const { order, Allorders, CustomerOrders, SingleOrder } = require("../controllers/order-controller.js");
const auth = require("../middlewares/auth.js");

//New Order
router.post("/order", auth, order)

//All Order
router.get("/allorders", Allorders)

//Single Order
router.get("/singleOrder/:id", auth, SingleOrder)

//Customer Order
router.get("/customerorders", auth, CustomerOrders)

module.exports = router