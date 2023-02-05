const express = require("express");
const { get } = require("mongoose");
const router = express.Router();
const verifyToken = require("../middleware/JWTAuth");
const Cart = require("../models/cart");

// get the cart for a specific user
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ user_id: userId });
    res.json(cart.products);
  } catch (error) {
    res.json({ success: false, error: "failed" });
  }
});

router.post("/merge/:userId", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.params.userId });
    // console.log("req.fields.cart", req.fields.cart);
    if (!cart) {
      const newCart = new Cart({
        user_id: req.params.userId,
        products: req.fields.cart,
      });
      await newCart.save();
      return res.status(201).json({ message: "Item added to cart." });
    }
    console.log(req.fields.cart);
    //If the item is already in the cart, update the quantity
    for (let i = 0; i < req.fields.cart.length; i++) {
      let product_id = req.fields.cart[i].product._id;
      const existingItem = cart.products.find((item) => {
        const itemProductId = item.product._id.toHexString();
        return itemProductId === product_id;
      });
      if (existingItem) {
        existingItem.quantity += req.fields.cart[i].quantity;
        await cart.save();
      } else {
        cart.products.push(req.fields.cart[i]);
        await cart.save();
      }
    }
    return res.status(201).json({ message: "Item added to cart." });
  } catch (error) {
    return res.json({ error: "Error adding item to cart." });
  }
});

//updating cart while logging out
router.put("/updateCart/:userId", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.params.userId });
    console.log("req.fields.cart", req.fields.cart);
    if (!cart) {
      const newCart = new Cart({
        user_id: req.params.userId,
        products: req.fields.cart,
      });
      console.log("saving cart", newCart);
      await newCart.save();
      return res.status(201).json({ message: "Item added to cart." });
    }
    console.log(req.fields.cart);
    cart.products = req.fields.cart;
    cart.save();
    // If the item is already in the cart, update the quantity

    return res.status(201).json({ message: "Item added to cart." });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error while updating adding item to cart." });
  }
});

// delete the cart for a specific user
router.delete("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    await Cart.deleteOne({ user_id: userId });

    res.json({ success: true, response: "cleared cart" });
  } catch (error) {
    res.json({ success: false, error: "not cleared" });
  }
});
module.exports = router;
