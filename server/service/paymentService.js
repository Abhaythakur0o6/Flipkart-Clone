const razorpay = require("../config/razorpayClient.js")
const orderService = require("../service/orderService.js")

const createPaymentLink = async (orderId) => {
    try {
        const order = await orderService.findOrderById(orderId)
        if (!order) {
            throw new Error("Order not found in database");
        }

        const paymentLinkRequest = {
            amount: order.totalPrice * 100,
            currency: "INR",
            reference_id: orderId.toString(),
            description: `Payment for Order ${orderId}`,
            customer: {
                name: order.user.name,
                contact: order.user.mobile,
                email: order.user.email
            },
            notify: {
                sms: true,
                email: true
            },
            callback_url: `http://localhost:5000/payment?orderId=${orderId}`,
            callback_method: "get"
        };

        const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest)

        const paymentLinkId = paymentLink.id;
        const payment_link_url = paymentLink.short_url;

        const resData = {
            paymentLinkId,
            payment_link_url
        }

        return resData
    } catch (error) {
        console.error("razorpayerror is", error)
        throw error
    }
}

const updatePaymentInformation = async (reqData) => {
    const paymentId = reqData.razorpay_payment_id;
    const orderId = reqData.orderId;

    try {
        const order = await orderService.findOrderById(orderId);
        const payment = await razorpay.payments.fetch(paymentId)

        if (payment.status == "captured") {
            order.paymentDetails.paymentId = paymentId;
            order.paymentDetails.status = "COMPLETED";
            order.status = "PLACED"

            await order.save()
        }
        const resData = { message: "your order is placed", success: true }
        return resData;
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    createPaymentLink,
    updatePaymentInformation
}