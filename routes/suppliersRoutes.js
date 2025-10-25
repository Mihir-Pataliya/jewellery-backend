const express = require("express");
const router = express.Router();
const supplierController = require("../controller/supplierscontroller");

// =============================
// 🟢 CREATE SUPPLIER
// =============================
router.post("/createsuppliers", supplierController.createSupplier);

// =============================
// 🟡 GET ALL SUPPLIERS
// =============================
router.get("/allsuppliers", supplierController.getAllSuppliers);

// =============================
// 🔵 GET SUPPLIER BY ID
// =============================
router.get("/allsuppliers/:id", supplierController.getSupplierById);

// =============================
// 🟠 UPDATE SUPPLIER
// =============================
router.put("/allsuppliers/update/:id", supplierController.updateSupplier);

// =============================
// 🔴 DELETE SUPPLIER
// =============================
router.delete("/allsuppliers/delete/:id", supplierController.deleteSupplier);

module.exports = router;
