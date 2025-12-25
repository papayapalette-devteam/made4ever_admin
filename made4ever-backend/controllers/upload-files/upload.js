const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");
const path = require("path");


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadToCloudinary = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const fileArray = Array.isArray(files) ? files : [files];

    const uploadPromises = fileArray.map((file) => {
      // original filename without extension
      const originalName = path.parse(file.originalname).name;

      return cloudinary.uploader.upload(file.path, {
        folder: "uploads",
        resource_type: "auto",

        // 👇 IMPORTANT OPTIONS
        public_id: originalName,      // same name as local
        use_filename: true,
        unique_filename: false,       // stop random string
        overwrite: false,             // prevent overwrite
      });
    });

    const results = await Promise.all(uploadPromises);

    // delete temp files
    await Promise.all(fileArray.map((file) => fs.unlink(file.path)));

    const urls = results.map((r) => r.secure_url);

    res.status(200).json({
      success: true,
      urls,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
};

module.exports = { uploadToCloudinary };
