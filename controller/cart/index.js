let router = require("express").Router();
require("dotenv").config();
const user = require("../../model/UserDB");
const category = require("../../model/Category");
const product = require("../../model/Product");
const eMail = require("../../utils");
const wishlist = require("../../model/Wishlist");
const cart = require("../../model/Cart");
const { route } = require("../user");



//!Add to cart(we have to give quantity and product id in the body)

let addToCart = async (req, res) => {
  const cartData = await cart.findOne({ userId: req.body.user_id });
  if (req.body.productId && req.body.quantity) {
    if (cartData) {
      let found = false;
      let x = cartData.products.map((element) => {
        if (element.productId === req.body.productId) {
          element.quantity = element.quantity + req.body.quantity;
          found = true;
        }
        return element;
      });

      if (!found) {
        cartData.products.push({
          productId: req.body.productId,
          quantity: req.body.quantity,
        });
      }
      let modify = await cart.findOneAndUpdate(
        { userId: req.body.user_id },
        { $set: { products: x } }
      );
      await cartData.save();
      res.json("Added to the cart");
    } else {
      const data = cart({
        userId: req.body.user_id,
        products: {
          productId: req.body.productId,
          quantity: req.body.quantity,
        },
      });
      await data.save();
      res.json("Successfully Added this product");
    }
  } else {
    res.json("Please enter the right key");
  }
};

//!display all Product

let displayAllProduct = async (req, res) => {
  const dataOfUser = await cart.findOne({ userId: req.body.user_id });
  let da = [];
  for (let i of dataOfUser.products) {
    let productData = await product.findOne({ _id: i.productId });
    da.push(productData);
  }
  res.json(da);
};


//!Delete the product from cart , you have to give the productID in the body

let deleteProduct = async (req, res) => {
  try {
    const data = await cart.findOne({ userId: req.body.user_id });
    if (req.body.productId) {
      data.products.forEach((element) => {
        if (element.productId == req.body.productId) {
          data.products.splice(element, 1);
        }
      });
      await data.save();
      res.json("Deleted this product successfully");
    } else {
      res.json("Provide productId");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

//!Update the product you have to give quantity

let updateProduct = async (req, res) => {
  const data = await cart.findOne({ userId: req.body.user_id });
  for (let i in data.products) {
    if (req.body.productId == data.products[i].productId) {
      let id = data.products[i].productId;
      data.products.splice(i, 1, {
        productId: id,
        quantity: req.body.quantity,
      });
      data.save();
      res.json("Successfully Updated~");
    }
  }
};

module.exports = { addToCart, displayAllProduct, deleteProduct, updateProduct };
