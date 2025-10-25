const { Supplier } = require('../models/mod');


const createSupplier = async (req, res) => {
  try {
    const { name, contactPerson, email, phone, address, city, state, country, status } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Supplier name is required" });
    }

    const supplier = await Supplier.create({
      name,
      contactPerson,
      email,
      phone,
      address,
      city,
      state,
      country,
      status
    });

    return res.status(201).json({
      message: "✅ Supplier created successfully",
      data: supplier
    });
  } catch (error) {
    console.error("Error creating supplier:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    return res.status(200).json({ data: suppliers });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      return res.status(404).json({ message: "❌ Supplier not found" });
    }

    return res.status(200).json({ data: supplier });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      return res.status(404).json({ message: "❌ Supplier not found" });
    }

    await supplier.update(req.body);

    return res.status(200).json({
      message: "✅ Supplier updated successfully",
      data: supplier
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      return res.status(404).json({ message: "❌ Supplier not found" });
    }

    await supplier.destroy();

    return res.status(200).json({ message: "✅ Supplier deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier
};
