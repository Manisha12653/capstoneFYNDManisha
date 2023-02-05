const express = require("express");
const app = express();

const path = require("path");

const formidableMiddleware = require("express-formidable");
require("dotenv").config({ path: "./app.env" });

const cors = require("cors");
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(formidableMiddleware());

//import routes
const pages = require("./routes/pages");
const products = require("./routes/products");
const orders = require("./routes/orders");
const categories = require("./routes/categories");
const auth = require("./routes/auth");
const cart = require("./routes/carts");

app.use("/products", products);
app.use("/pages", pages);
app.use("/orders", orders);
app.use("/categories", categories);
app.use("/auth", auth);
app.use("/cart", cart);

const dbConfig = require("./database/config");

const database = dbConfig.database;
console.log("database config", database);
const PORT = process.env.PORT || 5000;

const mongoose = require("mongoose");

//handing error at initial connection, mongoose would not try to reconnect at initial level if connections fails
mongoose
  .connect(database)
  .then(function () {
    console.log("db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

mongoose.connection.on("error", function (err) {
  console.log(err);
});

mongoose.connection.once("open", () => {
  console.log("connection openend");
});

app.listen(PORT, function () {
  console.log("app listening at port " + PORT);
});
