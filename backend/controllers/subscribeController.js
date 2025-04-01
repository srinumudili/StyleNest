const Subscriber = require("../models/Subscriber");

// @desc Handle Join Our Fashion Family Subscription
// @route POST /api/subscribe
// @access Public
const subscribeUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required!" });
  }

  try {
    // Check if the email is already subscribed
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      return res.status(400).json({ message: "Email is already subscribed." });
    }

    // Create new subscriber
    subscriber = new Subscriber({ email });
    await subscriber.save();

    res
      .status(201)
      .json({ message: "Successfully subscribed to our fashion family!" });
  } catch (error) {
    console.error("Error in subscribeUser:", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { subscribeUser };
