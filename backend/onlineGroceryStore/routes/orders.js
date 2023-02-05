const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const verifyToken = require("../middleware/JWTAuth");
// GET /orders
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  Order.find({ user_id: userId }, (error, orders) => {
    if (error) console.log(error);
    res.json(orders);
  });
});

// POST /orders
router.post("/", verifyToken, (req, res) => {
  const userId = req.fields.userId;
  const name = req.fields.name;
  const email = req.fields.email;
  const address = req.fields.address;
  const cart = req.fields.cart;
  const total = req.fields.total;

  const order = new Order({
    user_id: userId,
    name: name,
    email: email,
    address: address,
    cart: cart,
    total: total,
  });

  order.save((error) => {
    if (error) console.log(error);
    res.status(201).end();
  });
});

module.exports = router;
