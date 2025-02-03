const multer = require("multer");
const cloudinary = require("./cloudinaryConfig");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "property_pictures",
    allowed_formats: ["jpg", "png", "jpeg"],
    access_mode:"public",
  },
});

const upload = multer({ storage });

module.exports = upload;
