const express = require("express");
const router = express.Router();
const {
  createGift,
  getAllGifts,
  getGiftById,
  updateGift,
  deleteGift
} = require("../controller/giftcontroller");

const middlewares=require('../utils/middleware')

router.post("/creategift",middlewares.verifyToken,middlewares.allowRoles('Admin', 'Super Admin', 'Manager'), createGift);         
router.get("/", getAllGifts);          
router.get("/:id", getGiftById);       
router.put("/:id",middlewares.verifyToken,middlewares.allowRoles('Admin', 'Super Admin', 'Manager'), updateGift);       
router.delete("/:id",middlewares.verifyToken,middlewares.allowRoles('Admin', 'Super Admin', 'Manager'), deleteGift);     

module.exports = router;
