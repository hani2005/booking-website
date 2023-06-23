const mongoose = require("mongoose")

const RentCarSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  host: { type: String, ref: "User" },
  title: String,
  country: String,
  address: String,
  photos: [String],
  city: String,
  state: String,
  description: String,
  features: [String],
  categoriesCheck: [String],
  price: Number,
  modelYear: Number
})

const RentCarModel = mongoose.model("RentCar", RentCarSchema)

module.exports = RentCarModel
