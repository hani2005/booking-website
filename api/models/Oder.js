const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
//   products: Object,
  name: String,
  email: String,
  address: String,
  city: String,
}, {timestamps: true});

const OrderModel = mongoose.model("Order", OrderSchema)

module.exports = OrderModel
