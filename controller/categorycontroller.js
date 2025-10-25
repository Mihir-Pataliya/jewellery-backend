const sequelize=require('../db')
const{DataTypes}=require('sequelize')
const category = require('../models/category')(sequelize,DataTypes)
const uploadToCloudinary=require('../utils/cloudinary')

const createcategory=async(req,res)=>{
    try{
        const {name,description,parentId,status,metaTitle,metaDescription,image}=req.body;
        const file=req.file;

        if(!name){
            return res.status(400).json({message:"Name is required"})
        }

        // let imageurl=null
        // if(file){
        //     const result=await uploadToCloudinary(file.path,'categories');
        //     imageurl=result.secure_url;
        // }

        const result=await category.create({
            name,description,parentId,status,metaTitle,metaDescription,image
        })

        if(!result){
            return res.status(500).json({message:"failed to create category"})
        }
        return res.status(201).json({message:"category created successfully",data:result})
    }
    catch(err){
          return res.status(500).json({message:"Internal server error"})
    }
}

const getallcategory=async(req,res)=>{
    try{
           const result=await category.findAll({
            include:[
                {model:category, as:'subcategories',},
                {model:Product,as:'products'},
                {model:SeoMeta,as:'seoMeta'},
                {model:Offers,as:'offers'},
                {model:PriceRange,as:'priceRanges'}
        ]
           });

           if(!result.length){
            return res.status(404).json({message:"No category found"})
           }
              return res.status(200).json({message:"Categories fetched successfully",data:result})
           
    }
    catch(err){
          return res.status(500).json({message:"Internal server error",error:err.message})
    }
}

const getallcategorybyid=async(req,res)=>{
    try{
           const{id}=req.params;
           const result=await category.findByPk(id,{
            include:[
                {model:category, as:'subcategories',},
                {model:Product,as:'products'},
                {model:SeoMeta,as:'seoMeta'},
                {model:Offers,as:'offers'},
                {model:PriceRange,as:'priceRanges'}
        ]
           });
           return res.status(200).json({message:"category fetched successfully",data:result})
    }
    catch(err){
             return res.status(500).json({message:"Internal server error",error:err.message})
    }
}

const updatecategory=async(req,res)=>{
    try{
          const{id}=req.params;
          const{ name, description, parentId, status, metaTitle, metaDescription } = req.body;
          const result=await category.findByPk(id);
          if(!result){
            return res.status(404).json({message:"category not found"})
          }
           result.name=name||result.name;
           result.description=description||result.description;
           result.parentId=parentId||result.parentId;
           result.status=status||result.status;
           result.metaTitle=metaTitle||result.metaTitle;
           result.metaDescription=metaDescription||result.metaDescription;
           await result.save();
           return res.status(200).json({message:"category updated successfully",data:result})
    }
    catch(err){
          return res.status(500).json({message:"Internal server error",error:err.message})
    }
}

const deletecategory=async(req,res)=>{
    try{
        const{id}=req.params;
        const existingcategory=await category.findByPk(id);
        if(!existingcategory){
            return res.status(404).json({message:"category not found"})
        }
          await existingcategory.destroy();
          return res.status(200).json({message:"category deleted successfully"})
    }
    catch(err){
           return res.status(500).json({message:"Internal server error",error:err.message})
    }
}

module.exports={
    createcategory,
    getallcategory,
    getallcategorybyid,
    updatecategory,
    deletecategory
}