const express = require('express');
const router = express.Router();
const areaController = require('../controller/areacontroller');

router.post('/areas', areaController.createArea);

router.get('/areas', areaController.getAllAreas);

router.get('/areas/:id', areaController.getAreaById);

router.put('/areas/:id', areaController.updateArea);

router.delete('/areas/:id', areaController.deleteArea);

module.exports = router;
