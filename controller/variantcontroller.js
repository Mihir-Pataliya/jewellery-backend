'use strict';

const { where } = require('sequelize');
const { Variant,Product } = require('../models/mod');


const createVariant = async (req, res) => {
  try {
    const { productId, name, sku, price, stock, status, createdBy, updatedBy } = req.body;

    const product=await Product.findByPk(productId);
    if (!product) {
      return res.status(400).json({ success: false, message: 'Invalid productId' });
    }

    const variant = await Variant.create({
      productId,
      name,
      sku,
      price,
      stock,
      status: status || 'active',
      createdBy: req.user.roleId,
      updatedBy: req.user.roleId
    });

    return res.status(201).json({
      success: true,
      message: 'Variant created successfully',
      data: variant
    });

  } catch (error) {
    console.error('Error creating variant:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllVariants = async (req, res) => {
  try {
    const variants = await Variant.findAll();
    return res.status(200).json({ success: true, data: variants });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


const getVariantById = async (req, res) => {
  try {
    const { id } = req.params;
    const variant = await Variant.findByPk(id);

    if (!variant) {
      return res.status(404).json({ success: false, message: 'Variant not found' });
    }

    return res.status(200).json({ success: true, data: variant });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


const updateVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, name, sku, price, stock, status, updatedBy } = req.body;

    const variant = await Variant.findByPk(id);
    if (!variant) {
      return res.status(404).json({ success: false, message: 'Variant not found' });
    }

    
    await variant.update({
      productId: productId !== undefined ? productId : variant.productId,
      name: name !== undefined ? name : variant.name,
      sku: sku !== undefined ? sku : variant.sku,
      price: price !== undefined ? price : variant.price,
      stock: stock !== undefined ? stock : variant.stock,
      status: status !== undefined ? status : variant.status,
      updatedBy: updatedBy !== undefined ? updatedBy : variant.updatedBy
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Variant updated successfully', 
      data: variant 
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const variant = await Variant.findByPk(id);

    if (!variant) {
      return res.status(404).json({ success: false, message: 'Variant not found' });
    }

    await variant.destroy();

    return res.status(200).json({ success: true, message: 'Variant deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createVariant,
  getAllVariants,
  getVariantById,
  updateVariant,
  deleteVariant
};
