const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} = require('../controller/ordercontroller');

const middleware = require('../utils/middleware');

// Create Order
router.post('/createorder', middleware.verifyToken, createOrder);

// Get All Orders (for logged-in user)
router.get('/getorders', middleware.verifyToken, getAllOrders);

// Get Single Order by ID
router.get('/getorder/:id', middleware.verifyToken, getOrderById);

// Update Order (example: update notes, address, or shipping)
router.put('/updateorder/:id', middleware.verifyToken, updateOrder);

// Delete Order
router.delete('/deleteorder/:id', middleware.verifyToken, deleteOrder);

module.exports = router;
