const { OrderPromo, Order, Coupon } = require('../models/mod');
const { Op, Sequelize } = require('sequelize');

const applyPromo = async (req, res) => {
  try {
    const { orderId, promoCode } = req.body;
    const userId = req.user.id; 

    if (!orderId || !promoCode) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const coupon = await Coupon.findOne({
      where: Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('code')),
        promoCode.toLowerCase()
      ),
    });
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });

    const now = new Date();
    if (coupon.startDate && now < new Date(coupon.startDate)) {
      return res.status(400).json({ message: 'Coupon is not active yet' });
    }
    if (coupon.endDate && now > new Date(coupon.endDate)) {
      return res.status(400).json({ message: 'Coupon has expired' });
    }

    const existingUse = await OrderPromo.findOne({
      where: { couponId: coupon.id, userId },
    });
    if (existingUse) {
      return res.status(400).json({
        message: 'You have already used this coupon before. You cannot use it again.',
      });
    }

    const userUsageCount = await OrderPromo.count({
      where: { couponId: coupon.id, userId },
    });
    if (coupon.usageLimitPerUser && userUsageCount >= coupon.usageLimitPerUser) {
      return res.status(400).json({ message: 'You have reached the usage limit for this coupon' });
    }

    const totalUsageCount = await OrderPromo.count({
      where: { couponId: coupon.id },
    });
    if (coupon.usageLimitTotal && totalUsageCount >= coupon.usageLimitTotal) {
      return res.status(400).json({ message: 'This coupon has reached its total usage limit' });
    }

    if (parseFloat(order.totalAmount) < parseFloat(coupon.minPurchaseAmount)) {
      return res.status(400).json({
        message: `Order amount must be at least ${coupon.minPurchaseAmount} to use this coupon.`,
      });
    }

    let discountAmount = 0;
    if (coupon.discountType.toLowerCase() === 'percentage') {
      discountAmount = (parseFloat(order.totalAmount) * parseFloat(coupon.discountValue)) / 100;
      if (coupon.maxDiscountAmount && discountAmount > parseFloat(coupon.maxDiscountAmount)) {
        discountAmount = parseFloat(coupon.maxDiscountAmount);
      }
    } else if (coupon.discountType.toLowerCase() === 'flat') {
      discountAmount = parseFloat(coupon.discountValue);
    }

    const orderPromo = await OrderPromo.create({
      orderId,
      couponId: coupon.id,
      userId,
      promoCode,
      discountAmount,
      status: 'applied',
    });

    
    order.totalDiscount = discountAmount; 
    order.finalAmountToPay =
      parseFloat(order.totalAmount) +
      parseFloat(order.totalTax) -
      parseFloat(order.totalDiscount) -
      parseFloat(order.walletUsed);

    if (order.finalAmountToPay < 0) {
      order.finalAmountToPay = 0; 
    }

    await order.save();

    res.status(201).json({
      message: 'Promo applied successfully',
      orderPromo,
      updatedOrder: {
        totalDiscount: order.totalDiscount,
        finalAmountToPay: order.finalAmountToPay,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { applyPromo };
