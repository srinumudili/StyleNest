const Order = require("../models/Order");

// @desc Get all orders (Admin Only)
// @route GET /api/admin/orders
// @access Private/Admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.json(orders);
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ message: "Server Error." });
  }
};

// @desc Update order status (Admin Only)
// @route PUT /api/admin/orders/:id
// @access Private/Admin
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate("user", "name email");

    if (order) {
      order.status = req.body.status || order.status;
      order.isDelivered =
        req.body.status === "Delivered" ? true : order.isDelivered;
      order.deliveredAt =
        req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

      const updatedOrder = await order.save();
      res.json({ updatedOrder });
    } else {
      res.status(404).json({ message: "Order Not Found." });
    }
  } catch (error) {
    console.error("Update Order Status Error:", error);
    res.status(500).json({ message: "Server Error." });
  }
};

// @desc Delete order (Admin Only)
// @route DELETE /api/admin/orders/:id
// @access Private/Admin
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);

    if (order) {
      await order.deleteOne();
      res.json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ message: "Order Not Found." });
    }
  } catch (error) {
    console.error("Delete Order Error:", error);
    res.status(500).json({ message: "Server Error." });
  }
};

module.exports = { getAllOrders, updateOrderStatus, deleteOrder };
