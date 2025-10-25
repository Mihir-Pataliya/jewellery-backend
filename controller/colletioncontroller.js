const sequelize=require('../db')
const{DataTypes}=require('sequelize')
const  Collection  = require('../models/collection') (sequelize,DataTypes)
const generateSlug = require('../utils/slugify');
const uploadToCloudinary=require('../utils/cloudinary')

const createCollection = async (req, res) => {
  try {
    const { name, description, metaTitle, metaDescription, status } = req.body;


    if (!name) {
      return res.status(400).json({ success: false, message: 'Collection name is required' });
    }

    const slug = generateSlug(name);

    const existing = await Collection.findOne({ where: { slug } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Collection with this name already exists' });
    }



 let bannerurl = null;

if (req.file) {
  const result = await uploadToCloudinary(req.file.path, 'collections'); 
  bannerurl = result.secure_url;
}


    const collection = await Collection.create({
      name,
      slug,
      description,
      bannerImage:bannerurl,
      metaTitle,
      metaDescription,
      status,
      createdBy: req.user.roleId,
      updatedBy: req.user.roleId
    });

    
    res.status(201).json({
      success: true,
      message: 'Collection created successfully',
      data: collection
    });

  } catch (error) {
    console.error('Create Collection Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const getallcollection=async(req,res)=>{
    try{
        const result=await Collection.findAll();
        if(!result.length){
            return res.status(404).json({message:"No collection found"})
        }

        return res.status(200).json({message:"Collection fetched successfully",data:result})
    }
    catch(err){
        console.error('Get All Collections Error:', err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getCollectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await Collection.findByPk(id);

    if (!collection) {
      return res.status(404).json({ success: false, message: "Collection not found" });
    }

    res.status(200).json({
      success: true,
      message: "Collection fetched successfully",
      data: collection
    });
  } catch (error) {
    console.error("Get Collection by ID Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



const updateCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, metaTitle, metaDescription, status } = req.body;

    const collection = await Collection.findByPk(id);
    if (!collection) {
      return res.status(404).json({ success: false, message: "Collection not found" });
    }

    if (name) {
      collection.name = name;
      collection.slug = generateSlug(name);
    }

    if (description) collection.description = description;
    if (metaTitle) collection.metaTitle = metaTitle;
    if (metaDescription) collection.metaDescription = metaDescription;
    if (status !== undefined) collection.status = status;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.path, "collections");
      collection.bannerImage = result.secure_url;
    }

    collection.updatedBy = req.user.id;


    await collection.save();

    res.status(200).json({
      success: true,
      message: "Collection updated successfully",
      data: collection
    });

  } catch (error) {
    console.error("Update Collection Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await Collection.findByPk(id);

    if (!collection) {
      return res.status(404).json({ success: false, message: "Collection not found" });
    }

    await collection.destroy();

    res.status(200).json({
      success: true,
      message: "Collection deleted successfully"
    });
  } catch (error) {
    console.error("Delete Collection Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


module.exports = {
  createCollection,
  getallcollection,
  getCollectionById,
  updateCollection,
  deleteCollection
};
