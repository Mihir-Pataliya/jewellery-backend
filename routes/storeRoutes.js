const express = require('express');
const router = express.Router();
const storeController = require('../controller/storecontroller');

router.post('/createstore', storeController.createStore);

router.get('/', storeController.getAllStores);

router.get('/:id', storeController.getStoreById);

router.put('/:id', storeController.updateStore);

router.delete('/:id', storeController.deleteStore);

module.exports = router;
