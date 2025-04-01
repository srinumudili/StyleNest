const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const dotenv = require("dotenv");

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to handle stream upload to Cloudinary
const uploadStream = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
    // Use streamifier to convert file buffer to stream
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// @desc Upload image to Cloudinary
// @route POST /api/upload
// @access Private
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Call the uploadStream function
    const result = await uploadStream(req.file.buffer);

    // Respond with the uploaded image URL
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error("Upload Error: ", error);
    res.status(500).json({ message: "Server Error." });
  }
};

module.exports = { uploadImage };
