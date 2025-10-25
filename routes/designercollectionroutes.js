const express=require('express')
const router=express.Router()
const designercontrollers=require('../controller/designercollection')
const multer=require('multer')
const upload=multer({dest:'uploads/'})
const middlewares=require('../utils/middleware')

router.post("/createdesignercollection", upload.single("logo"), middlewares.verifyToken,middlewares.allowRoles('Admin', 'Super Admin', 'Manager'), designercontrollers.createDesignerCollection);
router.get('/getalldesignercollections',middlewares.verifyToken,designercontrollers.getAllDesignerCollections);
router.get('/getdesignercollection/:id',middlewares.verifyToken,designercontrollers.getDesignerCollectionById);
router.put('/updatedesignercollection/:id', middlewares.verifyToken,middlewares.allowRoles('Admin', 'Super Admin', 'Manager'), designercontrollers.updateDesignerCollection);
router.delete('/deletedesignercollection/:id', middlewares.verifyToken,middlewares.allowRoles('Admin', 'Super Admin', 'Manager'), designercontrollers.deleteDesignerCollection);

module.exports=router;  