import axiosInstance from "./AxiosInstance";
const URL = import.meta.env.VITE_API_URL;


// Order Placement API
export const placeOrderApi = async (cartItems, totalPrice) => {
    const res = await axiosInstance.post(`/order`, { cartItems, totalPrice });
    return res.data.orderId
}

// Payment Gateway page
export const toPaymentGateway = async (orderId) => {
    const res = await axiosInstance.post(`/payment/${orderId}`)
    const travelLink = res.data.payment_link_url
    return travelLink
}

// Customer Orders API
export const OrderApi = async () => {
    const res = await axiosInstance.get(`/customerorders`)
    return res.data.orders
}

//Get Single Order
export const SingleOrderApi = async (id) => {
    const res = await axiosInstance.get(`/singleOrder/${id}`)
    return res.data.order
}

//Send OTP
export const SendOtp = async (email) => {
    const res = await axiosInstance.post(`/send-otp`, { email: email })
    return res.data.message
}

//Save Review
export const SubmitReview = async (userReview, id) => {
    const res = await axiosInstance.post(`/review/${id}`, {
        rating: userReview.rating,
        title: userReview.title,
        description: userReview.description
    })
    return res.data.message
}

//Edit Review
export const SubmitReviewChanges = async (userReview, id) => {
    const res = await axiosInstance.post(`/review/update/${id}`, {
        rating: userReview.rating,
        title: userReview.title,
        description: userReview.description,
    })
    return res.data.message
}

//Delete Review
export const DeleteReview = async (id) => {
    const res = await axiosInstance.post(`/review/delete/${id}`)
    return res.data.message
}