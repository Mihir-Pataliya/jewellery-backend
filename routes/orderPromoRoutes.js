const express = require('express');
const router = express.Router();
const { applyPromo } = require('../controller/orderpromocontroller');
const middlewares=require('../utils/middleware')

router.post('/apply',middlewares.verifyToken, applyPromo);

module.exports = router;
