const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    user: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        mobile: { type: String, required: true }
    },

    items: [{
        productImg: { type: String, required: true },
        productName: { type: String, required: true },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true , min:1 },
        price: { type: Number, required: true }
    }],

    totalPrice: Number,

    paymentDetails: {
        paymentId: {
            type: String,
            default: ""
        },
        status: { type: String, default: "PENDING" }
    },

    status: {
        type: String,
        default: "PENDING"
    },

}, { timestamps: true })

module.exports = mongoose.model("Order", orderSchema);