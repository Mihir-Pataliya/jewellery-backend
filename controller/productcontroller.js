const { Product, Category, Collection, Supplier } = require("../models/mod");
const uploadToCloudinary = require("../utils/cloudinary");


const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      categoryId,
      collectionId,
      metalType,
      materialPurity,
      weight,
      gemstone,
      gemstoneWeight,
      length,
      size,
      price,
      sku,
      stock,
      status,
      discount,
      isFeatured,
      rating,
      returnable,
      warranty,
      metaTitle,
      metaDescription,
      views,
      likes,
      shippingWeight,
      supplierId,
      taxId,
      isComboEligible,
      designerCollectionId
    } = req.body;

 let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.path, "products");
        imageUrls.push(result.secure_url);
      }
    }


    if (!name || !categoryId || !collectionId || !metalType || !price || !sku) {
      return res.status(400).json({
        message:
          "Please provide all required fields (name, categoryId, collectionId, metalType, price, sku)",
      });
    }

    const product = await Product.create({
      name,
      description,
      categoryId,
      collectionId,
      metalType,
      materialPurity,
      weight,
      gemstone,
      gemstoneWeight,
      length,
      size,
      price,
      sku,
      stock,
      imageUrls,
      status,
      discount,
      isFeatured,
      rating,
      returnable,
      warranty,
      metaTitle,
      metaDescription,
      views,
      likes,
      shippingWeight,
      supplierId,
      taxId,
      isComboEligible,
      designerCollectionId,
    });

    return res.status(201).json({
      message: "✅ Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category, as: "category", attributes: ["id", "name"] },
        { model: Collection, as: "collection", attributes: ["id", "name"] },
        { model: Supplier, as: "supplier", attributes: ["id", "name"] },
      ],
      order: [["id", "ASC"]],
    });

    return res.status(200).json({
      message: "✅ All products fetched successfully",
      total: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: [
        { model: Category, as: "category" },
        { model: Collection, as: "collection" },
        { model: Supplier, as: "supplier" },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: "❌ Product not found" });
    }

    return res.status(200).json({
      message: "✅ Product fetched successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "❌ Product not found" });
    }

    let imageUrls = Array.isArray(product.imageUrls) ? product.imageUrls : [];


    if (req.files && req.files.length > 0) {
      const uploadResults = [];
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.path, "products"); 
        uploadResults.push(result.secure_url);
      }
      imageUrls = uploadResults; 
      
    }

    await product.update({ imageUrls });

    return res.status(200).json({
      message: "✅ Product images updated successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "❌ Product not found" });
    }

    await product.destroy();

    return res.status(200).json({
      message: "🗑️ Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
