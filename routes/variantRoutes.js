const express = require('express');
const router = express.Router();

const variantController = require('../controller/variantcontroller');

const middlewares=require('../utils/middleware')

router.post('/variants',middlewares.verifyToken,middlewares.allowRoles('Admin','Super Admin','Manager'),variantController.createVariant);

router.get('/variants', variantController.getAllVariants);

router.get('/variants/:id', variantController.getVariantById);

router.put('/variants/:id', middlewares.verifyToken,middlewares.allowRoles('Admin','Super Admin','Manager'),variantController.updateVariant);

router.delete('/variants/:id', middlewares.verifyToken,middlewares.allowRoles('Admin','Super Admin','Manager'),variantController.deleteVariant);

module.exports = router;
