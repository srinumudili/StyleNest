const mongoose = require("mongoose");
const { Schema } = mongoose;

const subscriberSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

module.exports = Subscriber;
