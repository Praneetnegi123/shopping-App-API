let router = require("express").Router();
require("dotenv").config();
var jwt = require("jsonwebtoken");
const user = require("../../model/UserDB");
const category = require("../../model/Category");
const product = require("../../model/Product");
const eMail = require("../../utils");
const wishlist = require("../../model/Wishlist");



//!Adding products to the wishlist
let addToWishlist=async(req,res)=>{
  const wishlistData = await wishlist.findOne({ userId: req.body.user_id });
  if (wishlistData) {
    if (wishlistData.productId.indexOf(req.body.productId) !== -1) {
      return res.json("Product already added in the wishlist");
    }
    wishlistData.productId.push(req.body.productId);
    await wishlistData.save();
    res.json("added to the wishlist");
  }
  if (!wishlistData) {
    const data = wishlist({
      userId: req.body.user_id,
      productId: req.body.productId,
    });
    await data.save();
    res.json("added to the wishlist");
  }
}


//! Show wishlist of particular id
let showWishlistForParticularUser=async(req,res)=>{
  const data = await wishlist.findOne({ userId: req.body.user_id });
  let products = data.productId;
  let listOfProducts = [];
  for (let i of products) {
    let objOfProduct = await product.findOne({ _id: i });
    listOfProducts.push(objOfProduct);
  }
  res.json(listOfProducts);
}



//!delete a product from wishlist
let deleteProduct=async(req,res)=>{

  const data = await wishlist.findOne({ userId: req.body.user_id });
  let deleteIndex = data.productId.indexOf(req.body.productId);
  if(deleteIndex!=-1){
    let x = data.productId.splice(deleteIndex, 1);
    await data.save();
    res.json(`deleted successfully ${x}`);
  }
  res.status(403).json("Not found this product")
}


module.exports = {addToWishlist,showWishlistForParticularUser,deleteProduct};
