const fs = require("fs");
const path = require("path");
const uploadToCloudinary = require("./utils/cloudinary"); // your utility file

// Full path to your images folder
const folderPath = "C:/Users/Dell/OneDrive/Desktop/images"; 
const cloudFolder = "tanishq_collections"; // folder in Cloudinary

const uploadAll = async () => {
  try {
    const files = fs.readdirSync(folderPath); // read all files

    for (const file of files) {
      const filePath = path.join(folderPath, file);

      try {
        const result = await uploadToCloudinary(filePath, cloudFolder);
        console.log(file, "=> URL:", result.secure_url); // prints the Cloudinary URL
      } catch (err) {
        console.log("Error uploading:", file, err.message);
      }
    }
  } catch (err) {
    console.log("Error reading folder:", err.message);
  }
};

uploadAll();
