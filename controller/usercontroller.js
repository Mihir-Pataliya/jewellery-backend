const multer = require("multer"); 
const bcrypt = require("bcryptjs");
const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const  User  = require("../models/user") (sequelize,DataTypes)
const crypto=require("crypto")
const sendEmail=require("../utils/nodemailer")
const uploadToCloudinary=require("../utils/cloudinary")
const storage = multer.memoryStorage();  
const jwt=require("jsonwebtoken");
const upload = multer({ storage });


const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, referralCode, role } = req.body;
    const file = req.file;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const validatePassword = (password) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      return regex.test(password);
    };

    if (!validatePassword(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newReferralCode = referralCode || "REF" + Date.now();
    let existingReferral = await User.findOne({ where: { referralCode: newReferralCode } });
    while (existingReferral) {
      newReferralCode = "REF" + Date.now();
      existingReferral = await User.findOne({ where: { referralCode: newReferralCode } });
    }

    
    const emailVerificationToken = crypto.randomBytes(20).toString("hex");
    const emailVerificationTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

    
    let profileImageUrl = null;
    if (file) {
      if (file) {
       const result = await uploadToCloudinary(req.file.path, "users");
        profileImageUrl = result.secure_url;
      }
    }

   const userRoleId = role || 5; 


    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      referralCode: newReferralCode,
      emailVerificationToken,
      emailVerificationTokenExpires,
      profileImage: profileImageUrl,
      role: userRoleId,
      walletBalance: 100.00
    });

    
    await sendEmail(
      user.email,
      "Verify Your Email",
      `<p>Hello ${user.name},</p>
       <p>Please verify your email by clicking the link below:</p>
       <a href="https://yourwebsite.com/verify-email?token=${emailVerificationToken}">Verify Email</a>`
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
         roleId: userRoleId,
        walletBalance: user.walletBalance
      },
    });

  } catch (error) {
    console.error("Create User Error:", error);
    res.status(500).json({ message: "Internal Server Error", err: error.message });
  }
};


const login=async(req,res)=>{
  try{
       const{email,password}=req.body;
       if(!email||!password){
        return res.status(400).json({message:"Email and password are required"})
       }

       const user=await User.findOne({where:{email}})
       if(!user){
        return res.status(400).json({message:"user not found"})
       }

       if(!user.status){
        return res.status(400).json({message:"user is blocked"})
       }

       if (!user.isEmailVerified) {
      return res.status(403).json({ message: "Email not verified. Please verify your email." });
    }

       const maxAttempts = 5;
       const blockTime = 15 * 60 * 1000; 
       const now = new Date();

      if (user.failedLoginAttempts >= maxAttempts) {
      const lastFailed = new Date(user.lastFailedLogin);

      if (now - lastFailed < blockTime) {
        const minutesLeft = Math.ceil((blockTime - (now - lastFailed)) / 60000);
        return res.status(403).json({
          message: `Account temporarily blocked. Try again after ${minutesLeft} minute(s).`
        });
      } else {
        user.failedLoginAttempts = 0;
        await user.save();
      }
    }

          const isMatch = await bcrypt.compare(password, user.password);
           if (!isMatch) {
            user.failedLoginAttempts += 1;
            user.lastFailedLogin = new Date();
            await user.save();
            const attemptsLeft = maxAttempts - user.failedLoginAttempts;
            return res.status(401).json({ 
            message: `Invalid credentials. ${attemptsLeft} attempt(s) left.` 
      });
    }

    
      user.failedLoginAttempts = 0;
      user.lastLogin = new Date();
      await user.save();
     

       const token=jwt.sign({id:user.id,roleId:user.roleId},process.env.JWT_SECRET,{expiresIn:'1h'})

       res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        referralCode: user.referralCode,
      },
      token,
    });

  } 
  catch(error){
         return res.status(500).json({message:"Internal server error"})
  }
}

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query; 

    if (!token) {
      return res.status(400).json({ message: "Verification token is missing" });
    }

  
    const user = await User.findOne({ where: { emailVerificationToken: token } });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const now = new Date();
    if (user.emailVerificationTokenExpires < now) {
    return res.status(400).json({ message: "Verification link has expired." });
   }

    
    user.isEmailVerified = true;
    user.emailVerificationToken = null; 
    user.emailVerificationTokenExpires = null;
    await user.save();

    await sendEmail(
      user.email,
      "Welcome to Our Jewelry Store!",
      `<h1>Hi ${user.name}!</h1>
       <p>Welcome to our jewelry website. Your email has been successfully verified.</p>
       <p>Enjoy shopping with us!</p>`
    );

    res.status(200).json({ message: "Email verified successfully. You can now login." });
  } catch (error) {
    console.error("Verify Email Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


const resendVerificationLink = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: "Email is already verified." });
    }

    const emailVerificationToken = crypto.randomBytes(20).toString("hex");
    const emailVerificationTokenExpires = new Date(Date.now() + 15 * 60 * 1000); 

    user.emailVerificationToken = emailVerificationToken;
    user.emailVerificationTokenExpires = emailVerificationTokenExpires;
    await user.save();

  
    const verificationLink = `http://yourwebsite.com/verify-email?token=${emailVerificationToken}`;
    await sendEmail(
      user.email,
      "Resend Email Verification",
      `<h1>Hi ${user.name}!</h1>
       <p>Please click the link below to verify your email. This link will expire in 15 minutes.</p>
       <a href="${verificationLink}">Verify Email</a>`
    );

    res.status(200).json({ message: "Verification link sent successfully." });

  } catch (error) {
    console.error("Resend Verification Link Error:", error);
    res.status(500).json({ message: "Internal Server Error", err: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000); 

    
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetTokenExpires;
    await user.save();

    
    const resetLink = `http://localhost:5000/api/auth/reset-password?token=${resetToken}`;

    
    await sendEmail(
      user.email,
      "Password Reset",
      `<p>Hello ${user.name},</p>
       <p>You requested a password reset. Click the link below:</p>
       <a href="${resetLink}">${resetLink}</a>
       <p>This link will expire in 15 minutes.</p>`
    );

    res.status(200).json({ message: "Password reset link sent to email" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Internal Server Error", err: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.query; 
    const { newPassword } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    
    const user = await User.findOne({ where: { passwordResetToken: token } });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regex.test(password);
}


   if (!validatePassword(newPassword)){
    return res.status(400).json({
    message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
   });
  }


    const now = new Date();
    if (user.passwordResetExpires < now) {
      return res.status(400).json({ message: "Token has expired. Request again." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Internal Server Error", err: error.message });
  }
};

module.exports = {
  createUser,
  login,
  verifyEmail,
  resendVerificationLink,
  forgotPassword,
  resetPassword
};
