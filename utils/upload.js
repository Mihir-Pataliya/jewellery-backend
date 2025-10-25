const multer = require('multer');
const  {CloudinaryStorage}  = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary'); 

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'banner_images',             
    format: async (req, file) => 'jpg',  
    public_id: (req, file) => Date.now() 
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
