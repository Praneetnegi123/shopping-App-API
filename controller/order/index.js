let router = require("express").Router();
require("dotenv").config();
var jwt = require("jsonwebtoken");
const user = require("../../model/UserDB");
const category = require("../../model/Category");
const product = require("../../model/Product");
const order = require("../../model/Orders");
const cart = require("../../model/Cart");
const eMail = require("../../utils");
var paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "ATd6BzZbNj9cWMxc6KJneZ7LjfmgD6YicL6ZA4MwNsrFZM388y1SNEZWul5cYPDOg1ppi1GGg3gPpPDm",
  client_secret:
    "EHu4_1v7xJkiJt5Y_-NnQdySIsyC0LdjEB_SIwrGLHcAG5ampE2tLuyK8jFpEAAOrr3vZPlVb_EASqdI",
});


let createOrder=async(req,res)=>{
  try {
    let cartItems =await  cart.find({userId:req.body.user_id})
    let cartArray=cartItems[0].products
    
    let newArr=[]
  
    for(let i of cartArray){
      let fullDetailsProduct=await product.findOne({_id:i.productId}).lean()
      fullDetailsProduct.quantity=i.quantity
      newArr.push(fullDetailsProduct)
    } 
    
    let ord = order({...req.body,items:newArr});
    await ord.save();
    res.json("added to the order~");
  }catch(err){res.status(400).send(err)}
}


let updateOrder=async(req,res)=>{
  let {id}=req.params
  try{
    let orderData=await order.findOneAndUpdate({_id:id},{$set:{shipping:req.body}})
    res.json(orderData)
  }catch(err){
    res.status(400).json(err)
  }
}

let cancelOrder=async(req,res)=>{
  let {id}=req.params
  try{
    let orderData=await order.findOneAndUpdate({_id:id},{$set:{isCancelled:true}})
    res.json("Order Cancelled")

  }
  catch(err){
    res.json({error:err})
  }
}


let pay=async(req,res)=>{
  const {id}=req.params
  let oderDetails=await order.findOne({_id:id})
  var create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `http://localhost:8080/success/${id}/`,
      cancel_url: "http://localhost:8080/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "item",
              sku: "item",
              price: oderDetails.total,
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: oderDetails.total,
        },
        description: "This is the payment description.",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      console.log("Create Payment Response");
      // console.log(payment);
      res.json(payment);
    }
  });

}

let success=async(req,res)=>{
  
  console.log("IN SUCCESS RAOUTER");
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const {id}=req.params

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "1.00",
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
     async function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        let status=await order.findOneAndUpdate({_id:id},{$set:{status:"approved"}})
        console.log(JSON.stringify(payment));
        res.json(payment);
      }
    }
  );
}


let cancel=(req,res)=>{
  res.json("cancelled")
}

module.exports = {createOrder,updateOrder,cancelOrder,pay,success,cancel};
  