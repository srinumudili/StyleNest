const express = require("express");
const {
  addToCart,
  updateCart,
  deleteFromCart,
  getCartDetails,
  mergeGuestCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", addToCart);
router.put("/", updateCart);
router.delete("/", deleteFromCart);
router.get("/", getCartDetails);
router.post("/merge", protect, mergeGuestCart);

module.exports = router;
