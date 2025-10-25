'use strict';

const express = require('express');
const router = express.Router();
const couponController = require('../controller/couponcontroller'); 

router.post('/coupons', couponController.createCoupon);

router.get('/coupons', couponController.getAllCoupons);

router.get('/coupons/:id', couponController.getCouponById);

router.put('/coupons/:id', couponController.updateCoupon);


router.delete('/coupons/:id', couponController.deleteCoupon);

module.exports = router;
