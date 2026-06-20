const Order = require("../models/order")
const User = require("../models/user")
const wrapAsync = require("../utils/wrapAsync")

//Place New Order
module.exports.order = wrapAsync(async (req, res) => {
    const { cartItems, totalPrice } = req.body
    const userId = req.user._id;
    const user = await User.findById(userId)
    if (!user) {
        return res.json({ message: "user not found" })
    }
    const formattedItems = cartItems.map(item => ({
        productName: item.title.shortTitle,
        productImg: item.detailUrl,
        productId: item._id,
        quantity: item.quantity,
        price: item.price.cost,
    }))

    const userDetail = {
        name: user.name,
        email: user.email,
        mobile: user.phone
    }

    const order = new Order({
        userId: userId,
        user: userDetail,
        items: formattedItems,
        totalPrice: totalPrice
    })

    const savedOrder = await order.save();

    res.status(200).json({ success: true, message: "order created successfully", orderId: savedOrder._id })
})


// Get all orders
module.exports.Allorders = wrapAsync(async (req, res) => {
    const { page, limit } = req.query;
    const currentPage = Number(page);
    const pageLimit = Number(limit);

    const skip = (currentPage - 1) * pageLimit;

    let query = Order.find({});

    query = query.skip(skip).limit(pageLimit);
    const allOrders = await query;

    const totalOrders = await Order.countDocuments({});

    res.status(200).json({
        message: "Orders Are Fetched",
        allOrders,
        page,
        totalPages: Math.ceil(totalOrders / pageLimit),
        totalOrders
    })
})

// Get customer Orders
module.exports.CustomerOrders = wrapAsync(async (req, res) => {
    const id = req.user._id;
    const orders = await Order.find({ userId: id })
    res.status(200).json({ success: true, orders })
})

// Single Order
module.exports.SingleOrder = wrapAsync(async (req, res) => {
    const { id } = req.params
    const order = await Order.findById(id)
    if (!order) {
        return res.status(404).json({ success: false, message: "order not found" })
    }
    res.status(200).json({ success: true, order })
}) 