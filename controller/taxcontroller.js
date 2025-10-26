'use strict';

const { TaxCalculation, Product } = require('../models/mod'); 


const createTax = async (req, res) => {
  try {
    const { productId, taxType, taxPercentage, effectiveFrom, effectiveTo } = req.body;

    if (!productId || !taxType || !taxPercentage || !effectiveFrom) {
      return res.status(400).json({ message: 'Please provide required fields' });
    }

     const product=await Product.findByPk(productId);
     if(!product){
       return res.status(404).json({message:'Product not found'})
     }

    const tax = await TaxCalculation.create({
      productId,
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


const getAllTaxes = async (req, res) => {
  try {
    const taxes = await TaxCalculation.findAll({
      include: [{ model: Product, as: 'product' }]
    });
    res.status(200).json({ taxes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


const getTaxByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const tax = await TaxCalculation.findAll({
      where: { productId },
      include: [{ model: Product, as: 'product' }]
    });

    if (!tax) {
      return res.status(404).json({ message: 'Tax not found for this product' });
    }

    res.status(200).json({ tax });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

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
  getTaxByProduct,
  updateTax,
  deleteTax
};
