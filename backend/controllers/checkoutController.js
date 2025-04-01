const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

// @desc Create a new checkout session
// @route POST /api/checkout
// @access Private
const createCheckoutSession = async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout." });
  }

  try {
    const newCheckout = await Checkout.create({
      user: req.user?._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });

    res.status(201).json(newCheckout);
  } catch (error) {
    console.error("Error in createCheckoutSession:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// @desc Update checkout to mark as paid after successful payment
// @route PUT /api/checkout/:id/pay
// @access Private
const updateCheckoutPaymentStatus = async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;
  const { id } = req.params;

  try {
    const checkout = await Checkout.findById(id);
    if (!checkout)
      return res.status(404).json({ message: "Checkout not found." });

    if (!paymentDetails || !paymentDetails.transactionId) {
      return res.status(400).json({ message: "Invalid payment details." });
    }

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();

      await checkout.save();
      return res.status(200).json(checkout);
    }

    return res.status(400).json({ message: "Invalid payment status." });
  } catch (error) {
    console.error("Error in updateCheckoutPaymentStatus:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// @desc Finalize checkout and convert to an order after payment confirmation
// @route POST /api/checkout/:id/finalize
// @access Private
const finalizeCheckout = async (req, res) => {
  const { id } = req.params;

  try {
    const checkout = await Checkout.findById(id);
    if (!checkout)
      return res.status(404).json({ message: "Checkout not found." });

    if (checkout.isPaid && !checkout.isFinalized) {
      const existingOrder = await Order.findOne({
        user: checkout.user,
        totalPrice: checkout.totalPrice,
      });
      if (existingOrder)
        return res
          .status(400)
          .json({ message: "Order already exists for this checkout." });

      const finalOrder = await Order.create({
        ...checkout.toObject(),
        isDelivered: false,
      });

      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();

      await Promise.all([
        checkout.save(),
        Cart.findOneAndDelete({ user: checkout.user }),
      ]);

      res.status(201).json(finalOrder);
    } else {
      res
        .status(400)
        .json({
          message: checkout.isFinalized
            ? "Checkout already finalized."
            : "Checkout is not paid.",
        });
    }
  } catch (error) {
    console.error("Error in finalizeCheckout:", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  createCheckoutSession,
  updateCheckoutPaymentStatus,
  finalizeCheckout,
};
