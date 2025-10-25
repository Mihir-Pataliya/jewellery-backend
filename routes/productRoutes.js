const express = require("express");
const router = express.Router();
const productController = require("../controller/productcontroller");
const multer=require('multer')
const upload=multer({dest:'uploads/'})

// =============================
// 🟢 CREATE PRODUCT
// =============================
router.post("/createproduct", upload.array("images", 5), productController.createProduct);

// =============================
// 🟡 GET ALL PRODUCTS
// =============================
router.get("/all", productController.getAllProducts);

// =============================
// 🔵 GET PRODUCT BY ID
// =============================
router.get("/:id", productController.getProductById);

// =============================
// 🟠 UPDATE PRODUCT
// =============================
router.put("/update/:id", upload.array("images", 5), productController.updateProduct);


// =============================
// 🔴 DELETE PRODUCT
// =============================
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
