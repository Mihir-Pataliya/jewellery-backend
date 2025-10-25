const express = require("express");
const router = express.Router();
const multer = require("multer");
const { 
  createUser, 
  login, 
  verifyEmail, 
  resendVerificationLink, 
  forgotPassword, 
  resetPassword 
} = require("../controller/usercontroller");


const upload=multer({dest:'uploads/'})


router.post("/register", upload.single("profileImage"), createUser);

router.post("/login", login);

router.get("/verify-email", verifyEmail);

router.post("/resend-verification", resendVerificationLink);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

module.exports = router;
