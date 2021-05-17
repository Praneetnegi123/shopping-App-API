let router = require("express").Router();
require("dotenv").config();
const user = require("../../model/UserDB");
const category = require("../../model/Category");
const product = require("../../model/Product");
const eMail = require("../../utils");

//!Adding categories

let addCategories = async (req, res) => {
  const result = await user.findOne({ _id: req.body.user_id });
  if (!result.isAdmin) {
    return res.status(401).json("Permission Denied!!!!");
  }
  const data = category({ categoryName: req.body.categoryName });
  await data.save();
  res.json("Successfully added this category!! Thank you");
};

// //!Show all category
let allCategories = async (req, res) => {
  const allCategories = await category.find({});
  res.json(allCategories);
};

// //!Adding Products
let addProduct = async (req, res) => {
  try {
    const result = await user.findOne({ _id: req.body.user_id });
    if (!result.isAdmin) {
      return res.json("Permission Denied!!!!");
    }
    const data = product(req.body);
    await data.save();
    res.json("Successfully Added Product!!!");
  } catch (err) {
    res.json(err.message);
  }
};

//!Search by id product/categoruId
let getProductByCategoryId = async (req, res) => {
  const findData = await product.findOne({ category: req.params.categoryId });
  res.json(findData);
};

//!Show all products
let showAllProduct = async (req, res) => {

  const allProducts = await product.find({}).populate("category");
  allProducts.map(element=>{
    delete element._doc.category._doc._id
    delete element._doc.category._doc.status
  })
  res.json(allProducts);
};

// //!Show a specific product details
let productDetails = async (req, res) => {
  const specificProduct = await product.findOne({ _id: req.params.productId });
  res.json(specificProduct);
};

//! Update a Product

let updateProduct = async (req, res) => {
  const result = await user.findOne({ _id: req.body.user_id });
  if (!result.isAdmin) {
    return res.json("Permission Denied!!!!");
  }
  const productData = await product.findOne({ _id: req.params.productId });
  //   res.json(req.body);
  if (!productData) {
    return res.json("Sorry No product available on this id!!!");
  }
  await product.updateMany(
    { _id: productData._id },
    {        
      $set: {
        productName: req.body.productName,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
      },
    }
  );
  res.json("Successfully Updated Product!!!");
};

module.exports = {
  addCategories,
  allCategories,
  addProduct,
  showAllProduct,
  getProductByCategoryId,
  productDetails,
  updateProduct,
};
