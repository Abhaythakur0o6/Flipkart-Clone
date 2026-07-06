const paymentService = require("../service/paymentService");
const wrapAsync = require("../utils/wrapAsync");

const createPaymentLink = wrapAsync(async (req, res) => {
    const paymentLink = await paymentService.createPaymentLink(req.params.id);
    return res.status(200).send(paymentLink)
})

const updatePaymentInformation = wrapAsync(async (req, res) => {
    const paymentLink = await paymentService.updatePaymentInformation(req.query);
    console.log("URL IS",process.env.CLIENT_URL);
    return res.redirect(`${process.env.CLIENT_URL}/order-success`);
})

module.exports = {
    createPaymentLink,
    updatePaymentInformation
}