'use strict';

const { Coupon, Offers } = require('../models/mod'); 

const createCoupon = async (req, res) => {
  try {
    const {
      code,
      title,
      description,
      discountType,
      discountValue,
      offer_id,
      minPurchaseAmount,
      maxDiscountAmount,
      startDate,
      endDate,
      usageLimitPerUser,
      usageLimitTotal,
      status
    } = req.body;

    
    const offer = await Offers.findByPk(offer_id);
    if (!offer) {
      return res.status(400).json({ success: false, message: 'Offer not found' });
    }

    const coupon = await Coupon.create({
      code,
      title,
      description,
      discountType,
      discountValue,
      offer_id,
      minPurchaseAmount,
      maxDiscountAmount,
      startDate,
      endDate,
      usageLimitPerUser,
      usageLimitTotal,
      status
    });

    return res.status(201).json({
      success: true,
      message: 'Coupon created successfully',
      data: coupon
    });

  } catch (error) {
    console.error('Error creating coupon:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.findAll({ include: [{ model: Offers, as: 'offer' }] });
    return res.status(200).json({ success: true, data: coupons });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


const getCouponById = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findByPk(id, { include: [{ model: Offers, as: 'offer' }] });
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }
    return res.status(200).json({ success: true, data: coupon });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const coupon = await Coupon.findByPk(id);
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }

    if (updateData.offer_id) {
      const offer = await Offers.findByPk(updateData.offer_id);
      if (!offer) return res.status(400).json({ success: false, message: 'Offer not found' });
    }

    await coupon.update(updateData);

    return res.status(200).json({ success: true, message: 'Coupon updated successfully', data: coupon });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findByPk(id);
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }

    await coupon.destroy();
    return res.status(200).json({ success: true, message: 'Coupon deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon
};
