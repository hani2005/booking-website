const mongoose = require("mongoose")

const ExperienceSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  host: { type: String, ref: "User" },
  title: String,
  country: String,
  address: String,
  photos: [String],
  city: String,
  state: String,
  description: String,
  included: [String],
  categoriesCheck: [String],
  price: Number,
})

const ExperienceModel = mongoose.model("Experience", ExperienceSchema)

module.exports = ExperienceModel