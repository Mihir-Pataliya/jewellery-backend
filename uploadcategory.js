const fs = require("fs");
const path = require("path");
const uploadToCloudinary = require("./utils/cloudinary");

const folderPath = "C:/Users/Dell/OneDrive/Desktop/imagecategory";
const cloudFolder = "tanishq_collections";
const uploadedListPath = path.join(__dirname, "uploaded.json"); // file to store uploaded images

const uploadAll = async () => {
  try {
    // Read old uploaded file list or create an empty one
    let uploadedFiles = [];
    if (fs.existsSync(uploadedListPath)) {
      uploadedFiles = JSON.parse(fs.readFileSync(uploadedListPath, "utf8"));
    }

    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      if (uploadedFiles.includes(file)) {
        console.log(`⏩ Skipping already uploaded: ${file}`);
        continue; // skip old ones
      }

      const filePath = path.join(folderPath, file);

      try {
        const result = await uploadToCloudinary(filePath, cloudFolder);
        console.log(`✅ Uploaded ${file}: ${result.secure_url}`);

        uploadedFiles.push(file); // add to list
        fs.writeFileSync(uploadedListPath, JSON.stringify(uploadedFiles, null, 2));
      } catch (err) {
        console.log("❌ Error uploading:", file, err.message);
      }
    }

    console.log("🎉 Upload completed!");
  } catch (err) {
    console.log("⚠️ Error reading folder:", err.message);
  }
};

uploadAll();
