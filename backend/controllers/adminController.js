const User = require("../models/User");

// @desc Get all users (Admin Only)
// @route GET /api/admin/users
// @access Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users || users.length === 0) {
      return res.status(400).json({ message: "There are no users." });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({ message: "Server Error." });
  }
};

// @desc Add a new user (Admin Only)
// @route POST /api/admin/users
// @access Private/Admin
const addUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }
    user = new User({
      name,
      email,
      password,
      role: role || "customer",
    });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Add User Error:", error);
    res.status(500).json({ message: "Server Error." });
  }
};

// @desc Update user info (Admin Only)
// @route PUT /api/admin/users/:id
// @access Private/Admin
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    const updatedUser = await user.save();
    res.json({ message: "User updated successfully!", user: updatedUser });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ message: "Server Error." });
  }
};

// @desc Delete user (Admin Only)
// @route DELETE /api/admin/users/:id
// @access Private/Admin
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await user.deleteOne();
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ message: "Server Error." });
  }
};

module.exports = { getAllUsers, addUser, updateUser, deleteUser };
