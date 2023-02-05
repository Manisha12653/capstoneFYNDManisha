const express = require("express");
const router = express.Router();

const Category = require("../models/category");

// GET /categories
router.get("/", (req, res) => {
  Category.find({}, (error, categories) => {
    if (error) console.log(error);
    else {
      console.log("catgories", categories);
      res.json(categories);
    }
  });
});

module.exports = router;
