const jwt = require('jsonwebtoken');
const sequelize=require('../db')
const {DataTypes}=require('sequelize')
const  Role  = require('../models/role') (sequelize,DataTypes) 


function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ success: false, message: "❌ Token missing" });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ success: false, message: "❌ Token not found after Bearer" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "❌ Invalid or expired token",
      error: err.message
    });
  }
}

// Allow multiple roles dynamically using DB
function allowRoles(...allowedRoles) {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ success: false, message: '❌ Access denied' });
    }

    try {
      // Fetch the role from the Role table using roleId
      const role = await Role.findOne({ where: { id: req.user.roleId } });
      if (!role) {
        return res.status(403).json({ success: false, message: '❌ User role not found' });
      }

      // Check if the role name is in allowedRoles
     if (!allowedRoles.map(r => r.toLowerCase()).includes(role.name.toLowerCase().trim())) {
        return res.status(403).json({ success: false, message: '❌ Access denied' });
      }


      next();
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
  };
}

module.exports = {
  verifyToken,
  allowRoles
};
