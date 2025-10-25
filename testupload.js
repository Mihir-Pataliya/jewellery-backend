const path = require("path");
const uploadToCloudinary = require("./utils/cloudinary");

// 1. Path to your image
const filePath = path.join(__dirname, "test", "goldring.jpg");

// 2. Upload image
uploadToCloudinary(filePath, "categories/rings")
  .then(result => {
    console.log("Image uploaded successfully!");
    console.log("URL:", result.secure_url);
  })
  .catch(err => {
    console.error("Upload failed:", err.message);
  });
