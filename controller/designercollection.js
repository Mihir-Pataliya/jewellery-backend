const sequelize=require('../db')
const {DataTypes}=require('sequelize')
const  DesignerCollections  = require("../models/designercollection") (sequelize,DataTypes);
const uploadToCloudinary = require("../utils/cloudinary");

// 🟢 Create Designer Collection
const createDesignerCollection = async (req, res) => {
  try {
    const { name, description, status, collectionId } = req.body;
    const file = req.file;

    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }

    let logoUrl = null;
    if (file) {
      const uploadResult = await uploadToCloudinary(file.path, "designerCollections");
      logoUrl = uploadResult.secure_url;
    }

    // create collection
    const collection = await DesignerCollections.create({
      name,
      description,
      logo: logoUrl,
      status,
      collectionId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Designer Collection created successfully",
      data: collection,
    });
  } catch (error) {
    console.error("Error creating collection:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// 🟡 Get all collections
const getAllDesignerCollections = async (req, res) => {
  try {
    const collections = await DesignerCollections.findAll();
    res.status(200).json({
      success: true,
      message: "All collections fetched successfully",
      data: collections,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// 🔵 Get single collection by ID
const getDesignerCollectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await DesignerCollections.findByPk(id);

    if (!collection) {
      return res.status(404).json({ success: false, message: "Collection not found" });
    }

    res.status(200).json({
      success: true,
      message: "Collection fetched successfully",
      data: collection,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// 🟣 Update collection
const updateDesignerCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    const collection = await DesignerCollections.findByPk(id);
    if (!collection) {
      return res.status(404).json({ success: false, message: "Collection not found" });
    }

    let logoUrl = collection.logo;
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, "designerCollections");
      logoUrl = uploadResult.secure_url;
    }

    await collection.update({ name, description, logo: logoUrl, status });
    res.status(200).json({
      success: true,
      message: "Collection updated successfully",
      data: collection,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// 🔴 Delete collection
const deleteDesignerCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await DesignerCollections.findByPk(id);

    if (!collection) {
      return res.status(404).json({ success: false, message: "Collection not found" });
    }

    await collection.destroy();
    res.status(200).json({
      success: true,
      message: "Collection deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// 🧩 Export all functions
module.exports = {
  createDesignerCollection,
  getAllDesignerCollections,
  getDesignerCollectionById,
  updateDesignerCollection,
  deleteDesignerCollection,
};




// {
//     "email":"mihirpataliya11@gmail.com",
//     "password":"Mihir@123"
// }