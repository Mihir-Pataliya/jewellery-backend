const express = require('express');
const router = express.Router();
const collectionController = require('../controller/colletioncontroller');
const multer=require('multer')
const upload=multer({dest:'uploads/'})
const middlewares=require('../utils/middleware')

router.post('/createcollection', upload.single('bannerImage'), middlewares.verifyToken,middlewares.allowRoles('Admin', 'Super Admin', 'Manager'), collectionController.createCollection);
router.get('/getallcollections', middlewares.verifyToken, collectionController.getallcollection);
router.get('/getcollection/:id', middlewares.verifyToken, collectionController.getCollectionById);
router.put('/updatecollection/:id', upload.single('bannerImage'), middlewares.verifyToken, middlewares.allowRoles('Admin', 'Super Admin', 'Manager'), collectionController.updateCollection);
router.delete('/deletecollection/:id', middlewares.verifyToken, middlewares.allowRoles('Admin', 'Super Admin', 'Manager'), collectionController.deleteCollection);

module.exports = router;
