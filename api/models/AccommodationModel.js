const mongoose = require("mongoose")

const AccommodationSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: [String],
  title: String,
  country: String,
  address: String,
  city: String,
  state: String,
  // photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
  bedrooms: Number,
  beds: Number,
  bathrooms: Number,
  price: Number
})

const AccommodationModel = mongoose.model("Accommodation", AccommodationSchema)

module.exports = AccommodationModel
