const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const Product = require("../models/product");
const appDir = path.dirname(require.main.filename);

// get all products i.e category is all
router.get("/", function (req, res) {
  const p = req.query.p ? req.query.p : 1;
  Product.find({}, function (err, products) {
    if (err) console.log(err);
    res.json(products);
  })
    .skip((p - 1) * 12)
    .limit(12);
});

//get the products on the based of categorie , if categories is fruit/vege/spices
// then fetch product categroy type fruit/vege/spices
router.get("/:category", function (req, res) {
  let cat = req.params.category;
  const p = req.query.p ? req.query.p : 1;
  Product.find({ category: cat }, function (err, products) {
    if (err) console.log(err);
    res.json(products);
  })
    .skip((p - 1) * 12)
    .limit(12);
});

//get products count
router.get("/count/:category", async function (req, res) {
  let cat = req.params.category;
  if (cat === "all") {
    Product.countDocuments({}, function (err, count) {
      if (err) console.log(err);
      res.json(count);
    });
  } else {
    Product.countDocuments({ category: cat }, function (err, count) {
      if (err) console.log(err);
      res.json(count);
    });
  }
});

// adding  new product
router.post("/", async (req, res) => {
  const name = req.fields.name;
  const category = req.fields.category;
  const description = req.fields.description;
  const imageUpload = req.files.imageUpload;
  let image = imageUpload ? imageUpload.name : "noimage.png";
  const price = req.fields.price;

  if (image !== "noimage.png") {
    //appending data so that images could not overwirte
    image = +new Date() + "_" + image;
    //getting the path from where we uploaded the image
    const oldPath = imageUpload.path;
    console.log("old path" + oldPath);
    //configuring new path where we are gone put the new image
    const newPath = `${appDir}/public/media/products/${image}`;
    console.log("new path" + newPath);
    //reading that image from old path
    const rawData = fs.readFileSync(oldPath);
    console.log(rawData);
    // writing the data to new path
    fs.writeFile(newPath, rawData, (error) => {
      if (error) res.status(500).send(error);
    });
  }

  const product = new Product({
    name: name,
    category: category,
    description: description,
    image: image,
    price: price,
  });
  try {
    await product.save();
    res.status(201).end();
  } catch (error) {
    res.status(500).send(error);
    console.log(error.message);
  }
});

//updating a product
router.put("/", (req, res) => {
  //get all form data
  const id = req.fields.id;
  const name = req.fields.name;
  const category = req.fields.category;
  const description = req.fields.description;
  //get the uploded image
  const imageUpload = req.files.imageUpload;
  const price = req.fields.price;

  Product.findById(id, async (error, product) => {
    if (error) res.send(error);

    if (imageUpload) {
      //if older product containing image need to unlink that image
      if (product.image != "noimage.png") {
        //getting path from where we need to unlink the images
        const imagePath = `${appDir}/public/media/products/${product.image}`;
        fs.unlink(imagePath, (error) => {
          if (error) res.send(error);
        });
      }

      const image = +new Date() + "_" + imageUpload.name;
      //taking older path
      const oldPath = imageUpload.path;
      const newPath = `${appDir}/public/media/products/${image}`;
      const rawData = fs.readFileSync(oldPath);

      fs.writeFile(newPath, rawData, (error) => {
        if (error) res.send(error);
      });

      product.image = image;
    }

    product.name = name;
    product.category = category;
    product.description = description;
    product.price = price;

    try {
      await product.save();
      res.status(201).end();
    } catch (error) {
      res.send(error);
      console.log(error.message);
    }
  });
});

// PUT /delete/5
router.delete("/:id", (req, res) => {
  Product.findById(req.params.id, (error, product) => {
    if (error) res.send(error);

    if (product.image != "noimage.png") {
      const imagePath = `${appDir}/public/media/products/${product.image}`;
      fs.unlink(imagePath, (error) => {
        if (error) res.send(error);
      });
    }

    product.remove();
    res.status(204).end();
  });
});

module.exports = router;
