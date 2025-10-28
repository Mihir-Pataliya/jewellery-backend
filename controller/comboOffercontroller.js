const { ComboOffer, Product, ComboOfferProducts } = require('../models/mod');
const { Op } = require('sequelize');

// 🟢 Create Combo Offer
const createComboOffer = async (req, res) => {
  try {
    const { name, description, discountType, discountValue, startDate, endDate} = req.body;

    // Basic Validation
    if (!name || !discountValue || !startDate || !endDate) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    
    const comboOffer = await ComboOffer.create({
      name,
      description,
      discountType,
      discountValue,
      startDate,
      endDate,
      createdBy:req.user.roleId
    });

    

    return res.status(201).json({ message: 'Combo Offer created successfully', data: comboOffer });
  } catch (error) {
    console.error('Error creating combo offer:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


const getAllComboOffers = async (req, res) => {
  try {
    const offers = await ComboOffer.findAll({
      include: [{ model: Product, as: 'products' }]
    });

    return res.status(200).json({ data: offers });
  } catch (error) {
    console.error('Error fetching combo offers:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


const getComboOfferById = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await ComboOffer.findByPk(id, {
      include: [{ model: Product, as: 'products' }]
    });

    if (!offer) {
      return res.status(404).json({ message: 'Combo Offer not found' });
    }

    return res.status(200).json({ data: offer });
  } catch (error) {
    console.error('Error fetching combo offer:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


const deleteComboOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await ComboOffer.findByPk(id);

    if (!offer) {
      return res.status(404).json({ message: 'Combo Offer not found' });
    }

    await offer.destroy();
    return res.status(200).json({ message: 'Combo Offer deleted successfully' });
  } catch (error) {
    console.error('Error deleting combo offer:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


const updateComboOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, discountType, discountValue, startDate, endDate, status } = req.body;

    const offer = await ComboOffer.findByPk(id);
    if (!offer) {
      return res.status(404).json({ message: 'Combo Offer not found' });
    }

    await offer.update({
      name,
      description,
      discountType,
      discountValue,
      startDate,
      endDate,
      status,
      updatedBy: req.user ? req.user.id : null
    });

    return res.status(200).json({ message: 'Combo Offer updated successfully', data: offer });
  } catch (error) {
    console.error('Error updating combo offer:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


module.exports = {
  createComboOffer,
  getAllComboOffers,
  getComboOfferById,
  updateComboOffer,
  deleteComboOffer
};
