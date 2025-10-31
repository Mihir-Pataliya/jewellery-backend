const { Gift, Product } = require("../models/mod");


const createGift = async (req, res) => {
  try {
    const { productId, type, status } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    
    const productExists = await Product.findByPk(productId);
    if (!productExists) {
      return res.status(400).json({ message: "Invalid product ID. Product not found." });
    }

   
    const newGift = await Gift.create({
      productId,
      type,
      status,
      createdBy: req.user.roleId,
      updatedBy: req.user.roleId
    });

    return res.status(201).json({
      message: "Gift created successfully.",
      gift: newGift
    });
  } catch (error) {
    console.error("Error creating gift:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getAllGifts = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, status } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    if (type) where.type = type;
    if (status) where.status = status;

    const gifts = await Gift.findAndCountAll({
      where,
      include: [{ model: Product, as: "product" }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json({
      total: gifts.count,
      page: parseInt(page),
      totalPages: Math.ceil(gifts.count / limit),
      data: gifts.rows
    });
  } catch (error) {
    console.error("Error fetching gifts:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


const getGiftById = async (req, res) => {
  try {
    const { id } = req.params;
    const gift = await Gift.findByPk(id, {
      include: [{ model: Product, as: "product" }]
    });

    if (!gift) {
      return res.status(404).json({ message: "Gift not found." });
    }

    return res.status(200).json(gift);
  } catch (error) {
    console.error("Error fetching gift by ID:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


const updateGift = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, type, status, updatedBy } = req.body;

    const gift = await Gift.findByPk(id);
    if (!gift) {
      return res.status(404).json({ message: "Gift not found." });
    }

    if (productId) {
      const productExists = await Product.findByPk(productId);
      if (!productExists) {
        return res.status(400).json({ message: "Invalid product ID." });
      }
      gift.productId = productId;
    }

    gift.type = type || gift.type;
    gift.status = status || gift.status;
    gift.updatedBy = updatedBy || gift.updatedBy;

    await gift.save();

    return res.status(200).json({ message: "Gift updated successfully.", gift });
  } catch (error) {
    console.error("Error updating gift:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


const deleteGift = async (req, res) => {
  try {
    const { id } = req.params;

    const gift = await Gift.findByPk(id);
    if (!gift) {
      return res.status(404).json({ message: "Gift not found." });
    }

    await gift.destroy();
    return res.status(200).json({ message: "Gift deleted successfully." });
  } catch (error) {
    console.error("Error deleting gift:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


module.exports = {
  createGift,
  getAllGifts,
  getGiftById,
  updateGift,
  deleteGift
};
