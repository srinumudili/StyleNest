const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getBestSeller,
  getNewArrivals,
  getProductById,
  getSimilarProducts,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);
router.get("/", getProducts);
router.get("/best-seller", getBestSeller);
router.get("/new-arrivals", getNewArrivals);
router.get("/:id", getProductById);
router.get("/similar/:id", getSimilarProducts);

module.exports = router;
