'use strict';

const { Offers, Product, Category } = require('../models/mod');

const createOffer = async (req, res) => {
  try {
    const { name, description, offer_type, discount_value, start_date, end_date, status, created_by, product_id, category_id } = req.body;

    
    if (product_id) {
      const product = await Product.findByPk(product_id);
      if (!product) {
        return res.status(400).json({ success: false, message: 'Product not found' });
      }
    }

    
    if (category_id) {
      const category = await Category.findByPk(category_id);
      if (!category) {
        return res.status(400).json({ success: false, message: 'Category not found' });
      }
    }

    const offer = await Offers.create({
      name,
      description,
      offer_type,
      discount_value,
      start_date,
      end_date,
      status,
      created_by: req.user.roleId,
      product_id,
      category_id
    });

    return res.status(201).json({
      success: true,
      message: 'Offer created successfully',
      data: offer
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


const getAllOffers = async (req, res) => {
  try {
    const offers = await Offers.findAll({
      include: [
        { model: Product, as: 'product' },
        { model: Category, as: 'category' }
      ]
    });

    return res.status(200).json({ success: true, data: offers });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


const getOfferById = async (req, res) => {
  try {
    const { id } = req.params;

    const offer = await Offers.findByPk(id, {
      include: [
        { model: Product, as: 'product' },
        { model: Category, as: 'category' }
      ]
    });

    if (!offer) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }

    return res.status(200).json({ success: true, data: offer });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, offer_type, discount_value, start_date, end_date, status, created_by, product_id, category_id } = req.body;

    const offer = await Offers.findByPk(id);
    if (!offer) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }

    if (product_id) {
      const product = await Product.findByPk(product_id);
      if (!product) return res.status(400).json({ success: false, message: 'Product not found' });
    }
    if (category_id) {
      const category = await Category.findByPk(category_id);
      if (!category) return res.status(400).json({ success: false, message: 'Category not found' });
    }

    await offer.update({
      name,
      description,
      offer_type,
      discount_value,
      start_date,
      end_date,
      status,
      created_by,
      product_id,
      category_id
    });

    return res.status(200).json({ success: true, message: 'Offer updated successfully', data: offer });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;

    const offer = await Offers.findByPk(id);
    if (!offer) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }

    await offer.destroy();
    return res.status(200).json({ success: true, message: 'Offer deleted successfully' });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOffer,
  deleteOffer
};
