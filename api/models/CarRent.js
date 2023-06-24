const mongoose = require("mongoose")

const CarRentSchema = new mongoose.Schema({
  booked: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  country: String,
  address: String,
  photos: [String],
  city: String,
  state: String,
  description: String,
  modelYear: Number,
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  totalPrice: Number
})

const CarRentModel = mongoose.model("CarRent", CarRentSchema)

module.exports = CarRentModel