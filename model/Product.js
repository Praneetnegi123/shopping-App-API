const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = mongoose.model(
  "product",
  new Schema({
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: {type:mongoose.Schema.Types.ObjectId,ref:'category',require:true},
  })
);
module.exports = product;
