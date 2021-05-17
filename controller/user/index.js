// let router = require("express").Router();
require("dotenv").config();
var jwt = require("jsonwebtoken");  
const eMail=require("../../utils")
const user = require("../../model/UserDB");
const category = require("../../model/Category");
const product = require("../../model/Product");



//! Generating Random String
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//! Generating a token
const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRTE_KEY);
};

//! Register A User
let register=async(req,res)=>{
  try{
    req.body.verifyCode = makeid(40);
  const UserData = new user(req.body);
  await UserData.save();
  let id = await user.findOne({ email: req.body.email });
  eMail(req.body.email, `192.168.42.217:8080/verify/${id.verifyCode}`);
  res.send("Please check the your mail, and verify by clicking the link bellow");
  }catch(err){
    res.send(err.message)
  }
}



//! Confirming by email
let verifyUser=async (req, res)=>{
  const result = await user.findOne({ verifyCode: req.params.id });
  await user.updateOne({ _id: result._id }, { $set: { isValid: true } });
  res.send("Yeah Now you can login.....(^_^)");
}

//!Login A User
let login= async (req, res) => {
  const { email, password } = req.body;
  const userData = await user.findOne({ email: email });

  if (!userData) {
    return res.status(403).json("Not a User");
  }
  if (!userData.isValid) {
    return res.status(401).send("****Please Verify User****");
  }
  if (userData.password == password) {
    delete userData._doc.password
    delete userData._doc.isAdmin
    delete userData._doc.isValid
    res.json({userData,token:generateToken(userData.id)});
  } else {
    res.status(403).json("Wrong Password");
  }
}



//! Reset password
let generate_reset_pass_link=async(req,res)=>{
  let userData = await user.find({ _id: req.body.user_id });
  eMail(userData[0].email, `localhost:8080/reset/${userData[0]._id}`);
  res.send("****Please check your mail**** (^_^)");
}




// //!reset a password after generating it
let reset=async(req,res)=>{
  // let userData = await user.find({ _id: req.params.id });
  let userUpdate=await user.updateOne(
    {_id: req.params.id},
    {$set: { password: req.body.password }},
  );
 
  res.send("Successfully Updated (^_^)");
}



//!########################################################ADMIN##############################################

module.exports = {register,verifyUser,login,generate_reset_pass_link,reset};
