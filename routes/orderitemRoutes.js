const express = require('express');
const router = express.Router();
const { 
  createOrderItem, 
  getAllOrderItems, 
  getOrderItemById, 
  updateOrderItem, 
  deleteOrderItem 
} = require('../controller/orderItemController');
const middleware = require('../utils/middleware');

// Create Order Item
router.post('/create', middleware.verifyToken, createOrderItem);

// Get All Order Items
router.get('/getall', middleware.verifyToken, getAllOrderItems);

// Get Single Order Item by ID
router.get('/get/:id', middleware.verifyToken, getOrderItemById);

// Update Order Item (quantity, status, etc.)
router.put('/update/:id', middleware.verifyToken, updateOrderItem);

// Delete Order Item
router.delete('/delete/:id', middleware.verifyToken, deleteOrderItem);

module.exports = router;
