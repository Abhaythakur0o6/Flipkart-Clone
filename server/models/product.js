const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    detailUrl: {
        type: String,
        required: true
    },
    publicId:{
        type: String,
    },
    title: {
        shortTitle: {
            type: String,
            required: true
        },
        longTitle: {
            type: String,
            required: true
        }
    },
    price: {
        mrp: {
            type: Number,
            required: true
        },
        cost: {
            type: Number,
            required: true
        },
        discount: {
            type: String,
            required: true
        },
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        }
    }],

    averageRating: {
        type: Number,
        default: 0
    },

    numOfReviews: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)