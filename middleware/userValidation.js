let user=require("../model/UserDB")
require("dotenv").config();
var jwt = require("jsonwebtoken");  

let userValid=async(req,res,next)=>{
    let userFailed=[]
    let {email,password,name}=req.body
    let userFind=await user.find({email:email})
    if(userFind.length>=1){
        userFailed.push("User already Present")
        return res.send(userFailed)
    }
    if(!(/^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password))){
        userFailed.push("password must contain 8 character,one special character and one upperCase character")
    }
    
    if(name.length<=3){
        userFailed.push("Length of name should be greater than '3' ")
    }
    
    if(userFailed.length>=1){
        return res.status(400).json({Errors:userFailed})
    }
    else{
        next()
    }
}

let passwordValidation=(req,res,next)=>{
  let {password}=req.body
  if(/^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)){
    next()
  }else{
    res.status(400).json("password must contain 8 character,one special character and one upperCase character")
  }
    
}


//!Creating a Middleware
const verifyUser = async (req, res, next) => {
    try {
        const decoded = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRTE_KEY
        );
        console.log("===>",decoded)
     
      let userData = await user.findOne({ _id: decoded.id });
      if (userData) {
        req.body.user_id = decoded.id;
        next();
      }
    } catch {
      res.send("UNAUTHENTICATED");
    }
  };

module.exports={userValid,verifyUser,passwordValidation}