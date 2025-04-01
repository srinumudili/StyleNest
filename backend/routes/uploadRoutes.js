const express = require("express");
const multer = require("multer");
const { uploadImage } = require("../controllers/uploadController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Multer setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define the upload route
router.post("/", protect, upload.single("image"), uploadImage);

module.exports = router;
