const Order = require("../models/order");

async function findOrderById(orderId) {
  return await Order.findById(orderId);
}

async function createOrder(orderData) {
  const order = new Order(orderData);
  return await order.save();
}

async function updateOrderPayment(orderId, paymentId) {
  const order = await Order.findById(orderId);
  order.paymentDetails.paymentId = paymentId;
  order.paymentDetails.status = "COMPLETED";
  order.status = "PLACED";
  return await order.save();
}

module.exports = {
  findOrderById,
  createOrder,
  updateOrderPayment,
};