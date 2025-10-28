const { Order, User, Coupon } = require('../models/mod');

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { areaId, addressId, shippingMethod, walletUsed, couponId, notes } = req.body;

    if (!areaId || !addressId) {
      return res.status(400).json({ message: 'AreaId and AddressId are required' });
    }


    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

  
    let walletDeduction = 0;
    if (walletUsed && walletUsed > 0) {
      if (walletUsed > user.walletBalance) {
        return res.status(400).json({ message: 'Insufficient wallet balance' });
      }
      walletDeduction = walletUsed;
      user.walletBalance -= walletDeduction;
      await user.save();
    }

  
    let discountAmount = 0;
    if (couponId) {
      const coupon = await Coupon.findByPk(couponId);
      if (coupon) {
        discountAmount = coupon.discountAmount || 0; 
      }
    }

    
    const orderNumber = 'ORD' + Date.now();
    const trackingNumber = 'TRK' + Date.now();

  
    const order = await Order.create({
      userId,
      orderNumber,
      areaId,
      addressId,
      shippingMethod: shippingMethod || 'Standard',
      walletUsed: walletDeduction,
      couponId: couponId || null,
      notes: notes || '',
      totalAmount: 0,   
      totalTax: 0,
      totalDiscount: discountAmount,
      finalAmountToPay: 0,
      trackingNumber
    });

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({
      where: { userId },
      include: [{ model: Coupon, attributes: ['code', 'discountAmount'] }]
    });

    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json({ message: 'Orders fetched successfully', orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({
      where: { id, userId },
      include: [{ model: Coupon, attributes: ['code', 'discountAmount'] }]
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order fetched successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { addressId, shippingMethod, notes } = req.body;
    const userId = req.user.id;

    const order = await Order.findOne({ where: { id, userId } });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (addressId) order.addressId = addressId;
    if (shippingMethod) order.shippingMethod = shippingMethod;
    if (notes) order.notes = notes;

    await order.save();
    res.status(200).json({ message: 'Order updated successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({ where: { id, userId } });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    await order.destroy();
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports = { 
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder
 };
