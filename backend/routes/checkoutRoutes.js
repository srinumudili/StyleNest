const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createCheckoutSession,
  updateCheckoutPaymentStatus,
  finalizeCheckout,
} = require("../controllers/checkoutController");

const router = express.Router();

// Define routes using controller functions
router.post("/", protect, createCheckoutSession);
router.put("/:id/pay", protect, updateCheckoutPaymentStatus);
router.post("/:id/finalize", protect, finalizeCheckout);

module.exports = router;
