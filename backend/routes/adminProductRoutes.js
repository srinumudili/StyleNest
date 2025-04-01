const express = require("express");
const { getAllProducts } = require("../controllers/adminProductController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Define product admin route
router.get("/", protect, admin, getAllProducts);

module.exports = router;
