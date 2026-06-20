const Product = require("../models/product");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const cloudinary = require("../config/cloudinary")

module.exports.allProducts = wrapAsync(async (req, res) => {

    let filterQuery = {};
    let sortOption = {};

    const { rating, discount, arrivals, sort, page, limit } = req.query;

    const currentPage = Number(page);
    const pageLimit = Number(limit);

    const shouldPaginate = page && limit;

    if (rating) {
        filterQuery.averageRating = { $gte: Number(rating) };
    }

    if (discount) {
        filterQuery["price.discount"] = { $gte: Number(discount) };
    }

    if (arrivals === "new") {
        const recentDate = new Date();
        recentDate.setDate(recentDate.getDate() - 30);
        filterQuery.createdAt = { $gte: recentDate };
    }

    if (arrivals === "old") {
        const recentDate = new Date();
        recentDate.setDate(recentDate.getDate() - 30);
        filterQuery.createdAt = { $lt: recentDate };
    }


    if (sort === "price_asc") {
        sortOption["price.cost"] = 1;
    }

    if (sort === "price_desc") {
        sortOption["price.cost"] = -1;
    }

    const totalProduct = await Product.countDocuments(filterQuery);

    let query = Product.find(filterQuery).sort(sortOption);

    if (shouldPaginate) {
        const skip = (currentPage - 1) * pageLimit;
        query = query.skip(skip).limit(pageLimit);
    }

    const allProducts = await query;

    res.status(200).json({
        message: "All products fetched", allProducts, pagination: shouldPaginate
            ? {
                currentPage,
                totalPages: Math.ceil(totalProduct / pageLimit),
                totalProduct,
                pageLimit
            }
            : null
    });

});


//Single Product Route
module.exports.product = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const singleProduct = await Product.findById(id)
    res.status(200).json({
        singleProduct
    })
})

// Add product
module.exports.AddProduct = wrapAsync(async (req, res) => {
    const { quantity, category, description, longtitle, shorttitle, mrp, cost, discount } = req.body
    const detailUrl = req.file.path;
    const publicId = req.file.filename;

    const product = new Product({
        detailUrl,
        publicId,
        title: {
            shortTitle: shorttitle,
            longTitle: longtitle
        },
        price: {
            mrp,
            cost,
            discount,
        },
        quantity,
        category,
        description
    })
    await product.save()
    res.status(200).json({ message: "Product Added", product })
})

//Add Product Review
module.exports.ProdcutReview = wrapAsync(async (req, res) => {
    const { id } = req.params
    const { rating, title, description } = req.body
    const userId = req.user._id

    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({ success: false, message: "User Not Found" })
    }

    const product = await Product.findById(id)
    if (!product) {
        return res.status(404).json({ message: "Product Not found", success: false })
    }

    const alreadyReviewed = product.reviews.find(
        review => review.user.toString() === userId.toString()
    )

    if (alreadyReviewed) {
        return res.status(400).json({ success: false, message: "Already Reviewed this Product" })
    }

    const review = {
        user: userId,
        name: user.name,
        title,
        description,
        rating
    }
    product.reviews.push(review)

    product.numOfReviews = product.reviews.length

    product.averageRating =
        product.reviews.reduce((acc, item) => acc + item.rating, 0) /
        product.reviews.length

    await product.save()


    return res.status(201).json({
        success: true,
        message: "Review added successfully"
    })
})

// Update Review
module.exports.EditReview = wrapAsync(async (req, res) => {
    const { rating, title, description } = req.body
    const { id } = req.params
    const userId = req.user._id;

    const existingProduct = await Product.findById(id)
    if (!existingProduct) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }

    const existingReview = existingProduct.reviews.find(review => review.user.toString() === userId)
    if (!existingReview) {
        return res.status(404).json({
            success: false,
            message: "Review not found"
        })
    }

    existingReview.title = title
    existingReview.description = description
    existingReview.rating = rating

    existingProduct.averageRating = existingProduct.reviews.length
        ? existingProduct.reviews.reduce((acc, r) => acc + r.rating, 0) /
        existingProduct.reviews.length
        : 0

    await existingProduct.save()

    res.status(200).json({
        success: true,
        message: "Review updated successfully",
    })
})

//Delete Review Route
module.exports.DeleteReview = wrapAsync(async (req, res) => {
    const { id } = req.params
    const userId = req.user._id;

    const product = await Product.findById(id)
    if (!product) {
        return res.status(404).json({ message: "product not found", success: false })
    }

    const review = product.reviews.find(review => review.user.toString() === userId)
    if (!review) {
        return res.status(404).json({ message: "Review not found", success: false })
    }

    const reviews = product.reviews.filter(rev => rev.user.toString() !== review.user.toString())

    product.reviews = reviews

    product.averageRating = product.reviews.length
        ? product.reviews.reduce((acc, r) => acc + r.rating, 0) /
        product.reviews.length
        : 0

    await product.save()

    res.status(200).json({ message: "Review Deleted", success: true })
})


// Delete Product route
module.exports.DeleteProduct = wrapAsync(async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id);

    if(!product){
       return res.status(404).json({message: "product Not Found"})
    }

    if(product.publicId){
        await cloudinary.uploader.destroy(product.publicId);
    } 
    await product.deleteOne();

    res.status(200).json({ message: "Product Deleted", product })
})