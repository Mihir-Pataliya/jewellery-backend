const { OrderItem, Order, Product, TaxCalculation, Variant } = require('../models/mod');

const createOrderItem = async (req, res) => {
  try {
    let { orderId, productId, variantId, quantity } = req.body;

  
    if (!orderId || !productId || !quantity) {
      return res.status(400).json({ message: 'orderId, productId, and quantity are required' });
    }

    quantity = parseInt(quantity);

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const unitPrice = parseFloat(product.price);
    const totalPrice = unitPrice * quantity;

  
    const tax = await TaxCalculation.findOne({
      where: { metalType: product.metalType }
    });

    let taxPercentage = 0;
    let taxId = null;
    if (tax) {
      taxPercentage = parseFloat(tax.taxPercentage);
      taxId = tax.id; 
    }

    const taxAmount = (totalPrice * taxPercentage) / 100;


    const orderItem = await OrderItem.create({
      orderId,
      productId,
      variantId: variantId || null,
      productName: product.name,
      sku: product.sku,
      quantity,
      unitPrice,
      totalPrice,
      taxAmount,
      discountAmount: 0,
      taxId, // 
      status: 'pending'
    });


    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.totalAmount = parseFloat(order.totalAmount) + totalPrice;
    order.totalTax = parseFloat(order.totalTax) + taxAmount;
    order.totalQuantity = parseInt(order.totalQuantity || 0) + quantity;
    order.finalAmountToPay =
      order.totalAmount +
      order.totalTax -
      parseFloat(order.totalDiscount || 0) -
      parseFloat(order.walletUsed || 0);

    await order.save();

    res.status(201).json({
      message: 'Order item created and order totals updated successfully',
      orderItem,
      appliedTax: {
        taxId,
        metalType: product.metalType,
        taxPercentage,
        taxAmount
      },
      orderTotals: {
        totalAmount: order.totalAmount,
        totalTax: order.totalTax,
        finalAmountToPay: order.finalAmountToPay
      }
    });
  } catch (error) {
    console.error('Error creating order item:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getAllOrderItems = async (req, res) => {
  try {
    const items = await OrderItem.findAll({ include: [Order, Product] });
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching order items:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getOrderItemById = async (req, res) => {
  try {
    const item = await OrderItem.findByPk(req.params.id, { include: [Order, Product] });
    if (!item) return res.status(404).json({ message: 'Order item not found' });
    res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching order item:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const updateOrderItem = async (req, res) => {
  try {
    const { quantity, status } = req.body;
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Order item not found' });

    if (quantity) item.quantity = quantity;
    if (status) item.status = status;
    await item.save();

    res.status(200).json({ message: 'Order item updated successfully', item });
  } catch (error) {
    console.error('Error updating order item:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


const deleteOrderItem = async (req, res) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Order item not found' });

    await item.destroy();
    res.status(200).json({ message: 'Order item deleted successfully' });
  } catch (error) {
    console.error('Error deleting order item:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports = { 
  createOrderItem, 
  getAllOrderItems, 
  getOrderItemById, 
  updateOrderItem, 
  deleteOrderItem 
};

