const express = require('express');
const router = express.Router();
const offersController = require('../controller/offerscontroller');
const middlewares=require('../utils/middleware')


router.post('/offers', middlewares.verifyToken,middlewares.allowRoles('Admin','Super Admin','Manager'),offersController.createOffer);

router.get('/offers', offersController.getAllOffers);

router.get('/offers/:id', offersController.getOfferById);

router.put('/offers/:id', middlewares.verifyToken,middlewares.allowRoles('Admin','Super Admin','Manager'),offersController.updateOffer);

router.delete('/offers/:id', middlewares.verifyToken,middlewares.allowRoles('Admin','Super Admin','Manager'),offersController.deleteOffer);

module.exports = router;
