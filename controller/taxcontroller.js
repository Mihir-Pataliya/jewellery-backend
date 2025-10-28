'use strict';

const { TaxCalculation, Product } = require('../models/mod'); 

// ✅ Create new tax for a metal type
const createTax = async (req, res) => {
  try {
    const { metalType, taxType, taxPercentage, effectiveFrom, effectiveTo } = req.body;

    // validation
    if (!metalType || !taxType || !taxPercentage || !effectiveFrom) {
      return res.status(400).json({ message: 'Please provide required fields' });
    }

    // check if there are any products with this metal type (optional validation)
    const product = await Product.findOne({ where: { metalType } });
    if (!product) {
      return res.status(404).json({ message: 'No product found for this metal type' });
    }

    // create tax record
    const tax = await TaxCalculation.create({
      metalType,
      taxType,
      taxPercentage,
      effectiveFrom,
      effectiveTo
    });

    res.status(201).json({ message: 'Tax created successfully', tax });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


// ✅ Get all tax records with related products
const getAllTaxes = async (req, res) => {
  try {
    const taxes = await TaxCalculation.findAll({
      include: [{ model: Product, as: 'products' }]  // metalType-based association
    });
    res.status(200).json({ taxes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


// ✅ Get tax by metal type
const getTaxByMetal = async (req, res) => {
  try {
    const { metalType } = req.params;

    const tax = await TaxCalculation.findAll({
      where: { metalType },
      include: [{ model: Product, as: 'products' }]
    });

    if (!tax || tax.length === 0) {
      return res.status(404).json({ message: 'No tax found for this metal type' });
    }

    res.status(200).json({ tax });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


// ✅ Update tax details
const updateTax = async (req, res) => {
  try {
    const { id } = req.params;
    const { taxType, taxPercentage, effectiveFrom, effectiveTo } = req.body;

    const tax = await TaxCalculation.findByPk(id);
    if (!tax) return res.status(404).json({ message: 'Tax not found' });

    await tax.update({ taxType, taxPercentage, effectiveFrom, effectiveTo });

    res.status(200).json({ message: 'Tax updated successfully', tax });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


// ✅ Delete tax record
const deleteTax = async (req, res) => {
  try {
    const { id } = req.params;
    const tax = await TaxCalculation.findByPk(id);
    if (!tax) return res.status(404).json({ message: 'Tax not found' });

    await tax.destroy();
    res.status(200).json({ message: 'Tax deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createTax,
  getAllTaxes,
  getTaxByMetal,
  updateTax,
  deleteTax
};
