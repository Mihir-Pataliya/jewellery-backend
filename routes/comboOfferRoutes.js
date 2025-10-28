const express = require('express');
const router = express.Router();
const comboOfferController = require('../controller/comboOffercontroller');
const middleware = require('../utils/middleware'); 


router.post('/createcombo', middleware.verifyToken,middleware.allowRoles('Admin', 'Super Admin', 'Manager'), comboOfferController.createComboOffer);
router.get('/all', comboOfferController.getAllComboOffers);
router.get('/:id', comboOfferController.getComboOfferById);
router.put('/update/:id', middleware.verifyToken,middleware.allowRoles('Admin', 'Super Admin', 'Manager'), comboOfferController.updateComboOffer);
router.delete('/delete/:id', middleware.verifyToken,middleware.allowRoles('Admin', 'Super Admin', 'Manager'), comboOfferController.deleteComboOffer);

module.exports = router;
