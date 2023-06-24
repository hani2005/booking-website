const mongoose = require("mongoose")

const BookExperienceSchema = new mongoose.Schema({
  booked: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  country: String,
  address: String,
  photos: [String],
  city: String,
  state: String,
  description: String,
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  totalPrice: Number
})

const BookExperienceModel = mongoose.model("BookExperience", BookExperienceSchema)

module.exports = BookExperienceModel