const express = require('express');
const router = express.Router();
const stateController = require('../controller/statecontroller');

// CRUD routes
router.post('/createstate', stateController.createState);
router.post('/createmultiplestates', stateController.createMultipleStates);
router.get('/getallstates', stateController.getAllStates);
router.get('/getstate/:id', stateController.getStateById);
router.put('/updatestate/:id', stateController.updateState);
router.delete('/deletestate/:id', stateController.deleteState);

module.exports = router;
