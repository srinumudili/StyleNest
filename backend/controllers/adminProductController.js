const Product = require("../models/Product");

// @desc Get all products (Admin Only)
// @route GET /api/admin/products
// @access Private/Admin
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Server Error." });
  }
};

module.exports = { getAllProducts };
