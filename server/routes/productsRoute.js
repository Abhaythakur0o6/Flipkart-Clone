const express = require("express")
const router = express.Router();

const { allProducts, product, AddProduct, DeleteProduct, ProdcutReview, EditReview, DeleteReview } = require("../controllers/Product-controllers");
const auth = require("../middlewares/auth");
const upload  = require("../middlewares/multer");

//All Products
router.get("/allproducts", allProducts)

//Single Products
router.get("/product/:id", product)

//Delete product
router.delete("/deleteproduct/:id", DeleteProduct)

//Add Product
router.post("/addproduct",upload.single("image"), AddProduct)

//Add Product Review
router.post("/review/:id",auth, ProdcutReview)

//Update Product Review
router.post("/review/update/:id",auth, EditReview)

//Delete Product Review
router.post("/review/delete/:id",auth, DeleteReview)

module.exports = router