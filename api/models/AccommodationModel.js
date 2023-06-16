const mongoose = require("mongoose")

const AccommodationSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  country: String,
  address: String,
  city: String,
  state: String,
  description: String,
  perks: [String],
  categoriesCheck: [String],
  price: Number,
  beds: Number,
  bathrooms: Number,
  bedrooms: Number,
  maxGuests: Number
})

const AccommodationModel = mongoose.model("Accommodation", AccommodationSchema)

module.exports = AccommodationModel
