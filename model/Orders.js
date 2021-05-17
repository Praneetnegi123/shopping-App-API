const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billingSchema=new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pinCode: { type: String, required: true },
  }
)

const shippingSchema=new mongoose.Schema({
        name:{ type:String , required:true},
        address:{ type:String , required:true},
        city:{ type:String , required:true},
        pin:{ type:String , required:true},
        state:{ type:String , required:true},
        country:{ type:String , required:true}
})

const order = mongoose.model(
  "order",
  new Schema({
    user_id: { type: String, required: true },
    items: { type: Array, required: true },
    status: { type: String, default: "pending" },
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    billing:[billingSchema] ,
   shipping:[shippingSchema],
   isCancelled:{type:Boolean,default:false}
  })
);
module.exports = order;
