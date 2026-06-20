const multer = require("multer")
const cloudinary = require("../config/cloudinary")
const { CloudinaryStorage } = require("multer-storage-cloudinary")

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "flipkart-products",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [
            { width: 800, height: 600, crop: "limit" },
            { quality: "auto" },
        ],
    }
})

module.exports = upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only Image Allowed"));
    }
  },
});