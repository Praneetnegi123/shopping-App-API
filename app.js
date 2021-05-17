require("dotenv").config();
const express = require("express");
const app = express();
let user = require("./router/userRouter");
let catAndProd = require("./router/catAndProdRouter");
let wishlist = require("./router/wishListRouter");
let cart = require("./router/cartRouter");
let order = require("./router/orderRouter");
const mongoose = require("mongoose");
const port=process.env.PORT || 8080

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/shopDB2", {
  useNewUrlParser: true,
});

app.use("/", user);
app.use("/", catAndProd);
app.use("/", wishlist);
app.use("/", cart);
app.use("/",order);

app.listen(port, () => console.log(`--- listening at port ${port}---`));
