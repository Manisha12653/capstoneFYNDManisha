const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  products: [
    {
      product: {
        _id: {
          type: mongoose.Types.ObjectId,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        image: {
          type: String,
        },
        name: {
          type: String,
        },
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Grocery_cart = (module.exports = mongoose.model(
  "Grocery_cart",
  CartSchema
));
