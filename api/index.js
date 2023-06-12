const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const User = require("./models/User")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const multer = require("multer")
const AccommodationModel = require("./models/AccommodationModel")
const app = express()

// bcrypt password
const salt = bcrypt.genSaltSync(10)

// jwt secret
const secret = "sasofasfo43ogoeg5546p45kpojhuu21y8e3"

mongoose.connect(process.env.DATABASE_URL)

app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Here")
})

app.post("/register", async (req, res) => {
  // mongoose.connect(process.env.DATABASE_URL)
  const { username, password } = req.body
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt)
    })
    res.json(userDoc)
  } catch (e) {
    res.status(400).json(e)
  }
})

// to login
app.post("/login", async (req, res) => {
  // mongoose.connect(process.env.DATABASE_URL)
  const { username, password } = req.body
  const userDoc = await User.findOne({ username })
  const passOk = bcrypt.compareSync(password, userDoc.password)
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err
      res.cookie("token", token).json({
        id: userDoc._id,
        username
      })
    })
  } else {
    res.status(400).json("wrong credentials")
  }
})

// to get user profile
app.get("/profile", (req, res) => {
  // mongoose.connect(process.env.DATABASE_URL)
  const { token } = req.cookies
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err
    res.json(info)
  })
})

// logout
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok")
})

app.post("/places", (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  const { token } = req.cookies
  const {
    // addedPhotos
    title,
    country,
    city,
    state,
    bedrooms,
    bathrooms,
    beds,
    category,
    address,
    description,
    price,
    perks,
    // extraInfo,
    // checkIn,
    // checkOut,
    maxGuests
  } = req.body
  jwt.verify(token, secret, {}, async (err, userData) => {
    if (err) throw err
    const AccommodationDoc = await AccommodationModel.create({
      owner: userData.id,
      price,
      title,
      address,
      country,
      city,
      state,
      bedrooms,
      bathrooms,
      beds,
      category,
      // photos: addedPhotos,
      description,
      perks,
      // extraInfo,
      // checkIn,
      // checkOut,
      maxGuests
    })
    res.json(AccommodationDoc)
  })
})

app.get('/places/:id', async (req,res) => {
  // mongoose.connect(process.env.MONGO_URL);
  const {id} = req.params;
  res.json(await AccommodationModel.findById(id));
});

app.get('/places', async (req,res) => {
  // mongoose.connect(process.env.MONGO_URL);
  res.json( await AccommodationModel.find() );
});

app.listen(3000)
