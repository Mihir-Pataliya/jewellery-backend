const express=require('express')
const router=express.Router();
const categorycontrollers=require('../controller/categorycontroller')
const multer=require('multer')
const upload=multer({dest:'uploads/'})

router.post("/createcategory", upload.single("image"), categorycontrollers.createcategory);
router.get('/getallcategory',categorycontrollers.getallcategory)
router.get('/getallcategory/:id',categorycontrollers.getallcategorybyid)
router.put('/updatecategory/:id',categorycontrollers.updatecategory)
router.delete('/deletecategory/:id',categorycontrollers.deletecategory)

module.exports=router;