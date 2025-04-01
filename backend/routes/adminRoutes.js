const express = require("express");
const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Define admin routes
router.get("/", protect, admin, getAllUsers);
router.post("/", protect, admin, addUser);
router.put("/:id", protect, admin, updateUser);
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;
