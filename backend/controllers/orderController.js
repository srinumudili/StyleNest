const Order = require("../models/Order");

// @desc   Get logged-in user's orders
// @route  GET /api/orders/my-orders
// @access Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found." });
    }

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// @desc   Get order details by ID
// @route  GET /api/orders/:id
// @access Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { getMyOrders, getOrderById };
