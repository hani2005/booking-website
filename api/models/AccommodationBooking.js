const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
  booked: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  country: String,
  address: String,
  photos: [String],
  city: String,
  state: String,
  description: String,
  beds: Number,
  bathrooms: Number,
  bedrooms: Number,
  maxGuests: Number,
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  totalPrice: Number
})

const BookingModel = mongoose.model("Booking", bookingSchema)

module.exports = BookingModel
