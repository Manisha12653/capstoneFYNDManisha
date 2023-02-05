const mongoose = require("mongoose");

// Order Schema
const OrderSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  cart: {
    type: String,
  },
  total: {
    type: Number,
  },
});

const Order = (module.exports = mongoose.model("Order", OrderSchema));
