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
const Booking = require("./models/AccommodationBooking")
const app = express()
const axios = require("axios")
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3")
const fs = require("fs")
const RentCarModel = require("./models/RentCarModel")
const ExperienceModel = require("./models/ExperienceModel")
const CarRentModel = require("./models/CarRent")
const BookExperienceModel = require("./models/BookExperience")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// bcrypt password
const salt = bcrypt.genSaltSync(10)

// jwt secret
const secret = "sasofasfo43ogoeg5546p45kpojhuu21y8e1"
const bucket = "digital-bnb-2023"

app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
app.use(express.json())
app.use(cookieParser())
app.use("/uploads", express.static(__dirname + "/uploads"))

app.get("/api/", (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  res.send("Here")
})

async function uploadToS3(path, originalFilename, mimetype) {
  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    }
  })
  const parts = originalFilename.split(".")
  const ext = parts[parts.length - 1]
  const newFilename = Date.now() + "." + ext
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimetype,
      ACL: "public-read"
    })
  )
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`
}

const photosMiddleware = multer({ dest: "/tmp" })
app.post(
  "/api/upload",
  photosMiddleware.array("photos", 100),
  async (req, res) => {
    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname, mimetype } = req.files[i]
      const url = await uploadToS3(path, originalname, mimetype)
      uploadedFiles.push(url)
    }
    res.json(uploadedFiles)
  }
)

app.post("/api/register", async (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
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
app.post("/api/login", async (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
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
app.get("/api/profile", (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  const { token } = req.cookies
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err
    res.json(info)
  })
})

// logout
app.post("/api/logout", (req, res) => {
  res.cookie("token", "").json("ok")
})

app.post("/api/places", (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  const { token } = req.cookies
  const {
    title,
    country,
    city,
    state,
    address,
    addedPhotos,
    description,
    price,
    perks,
    maxGuests,
    beds,
    bathrooms,
    bedrooms,
    categoriesCheck
  } = req.body
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err
    const AccommodationDoc = await AccommodationModel.create({
      owner: info.id,
      host: info.username,
      title,
      address,
      country,
      state,
      city,
      description,
      perks,
      price,
      categoriesCheck,
      maxGuests,
      beds,
      bedrooms,
      photos: addedPhotos,
      bathrooms
    })
    res.json(AccommodationDoc)
  })
})

app.get("/api/places/:id", async (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  const { id } = req.params
  res.json(await AccommodationModel.findById(id))
})

app.get("/api/places", async (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  res.json(await AccommodationModel.find())
})

app.put("/api/places", async (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  const { token } = req.cookies
  const {
    id,
    title,
    address,
    country,
    state,
    city,
    description,
    perks,
    price,
    categoriesCheck,
    maxGuests,
    beds,
    bedrooms,
    addedPhotos,
    bathrooms
  } = req.body
  jwt.verify(token, secret, {}, async (err, userData) => {
    if (err) throw err
    const placeDoc = await AccommodationModel.findById(id)
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        country,
        state,
        city,
        description,
        perks,
        price,
        categoriesCheck,
        maxGuests,
        beds,
        bedrooms,
        photos: addedPhotos,
        bathrooms
      })
      await placeDoc.save()
      res.json("ok")
    }
  })
})

app.post("/api/car", (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  const { token } = req.cookies
  const {
    title,
    country,
    city,
    state,
    address,
    addedPhotos,
    description,
    price,
    features,
    modelYear,
    categoriesCheck
  } = req.body
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err
    const CarDoc = await RentCarModel.create({
      owner: info.id,
      host: info.username,
      title,
      address,
      country,
      state,
      city,
      description,
      features,
      price,
      categoriesCheck,
      modelYear,
      photos: addedPhotos
    })
    res.json(CarDoc)
  })
})

app.get("/api/car/:id", async (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  const { id } = req.params
  res.json(await RentCarModel.findById(id))
})

app.get("/api/car", async (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  res.json(await RentCarModel.find())
})

app.put("/api/car", async (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  const { token } = req.cookies
  const {
    id,
    title,
    address,
    country,
    state,
    city,
    description,
    features,
    price,
    categoriesCheck,
    addedPhotos,
    modelYear
  } = req.body
  jwt.verify(token, secret, {}, async (err, userData) => {
    if (err) throw err
    const CarDoc = await RentCarModel.findById(id)
    if (userData.id === CarDoc.owner.toString()) {
      CarDoc.set({
        title,
        address,
        country,
        state,
        city,
        description,
        features,
        price,
        categoriesCheck,
        photos: addedPhotos,
        modelYear
      })
      await CarDoc.save()
      res.json("ok")
    }
  })
})

app.post("/api/experience", (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  const { token } = req.cookies
  const {
    title,
    country,
    city,
    state,
    address,
    addedPhotos,
    description,
    price,
    included,
    categoriesCheck
  } = req.body
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err
    const ExperienceDoc = await ExperienceModel.create({
      owner: info.id,
      host: info.username,
      title,
      address,
      country,
      state,
      city,
      description,
      included,
      price,
      categoriesCheck,
      photos: addedPhotos
    })
    res.json(ExperienceDoc)
  })
})

app.get("/api/experience/:id", async (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  const { id } = req.params
  res.json(await ExperienceModel.findById(id))
})

app.get("/api/experience", async (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  res.json(await ExperienceModel.find())
})

app.put("/api/experience", async (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  const { token } = req.cookies
  const {
    id,
    title,
    address,
    country,
    state,
    city,
    description,
    price,
    categoriesCheck,
    addedPhotos,
    included
  } = req.body
  jwt.verify(token, secret, {}, async (err, userData) => {
    if (err) throw err
    const ExperienceDoc = await ExperienceModel.findById(id)
    if (userData.id === ExperienceDoc.owner.toString()) {
      ExperienceDoc.set({
        title,
        address,
        country,
        state,
        city,
        description,
        price,
        categoriesCheck,
        photos: addedPhotos,
        included
      })
      await ExperienceDoc.save()
      res.json("ok")
    }
  })
})

app.get("/api/user-experiences", (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  const { token } = req.cookies
  jwt.verify(token, secret, {}, async (err, userData) => {
    const { id } = userData
    res.json(await ExperienceModel.find({ owner: id }))
  })
})
app.get("/api/user-cars", (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  const { token } = req.cookies
  jwt.verify(token, secret, {}, async (err, userData) => {
    const { id } = userData
    res.json(await RentCarModel.find({ owner: id }))
  })
})
app.get("/api/user-places", (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  const { token } = req.cookies
  jwt.verify(token, secret, {}, async (err, userData) => {
    const { id } = userData
    res.json(await AccommodationModel.find({ owner: id }))
  })
})

app.post("/api/bookings", async (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  const { token } = req.cookies
  const {
    title,
    country,
    address,
    addedPhotos,
    city,
    state,
    description,
    beds,
    bathrooms,
    bedrooms,
    maxGuests,
    checkIn,
    checkOut,
  } = req.body
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err
    const BookingDoc = await Booking.create({
      booked: info.id,
      title,
      country,
      address,
      photos: addedPhotos,
      city,
      state,
      description,
      beds,
      bathrooms,
      bedrooms,
      maxGuests,
      checkIn,
      checkOut,
    })
    res.json(BookingDoc)
  })
})

app.get("/api/bookings", async (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  const { token } = req.cookies
  jwt.verify(token, secret, {}, async (err, userData) => {
    const { id } = userData
    res.json(await Booking.find({ booked: id }))
  })
})

app.post("/api/car-rent", async (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  const { token } = req.cookies
  const {
    title,
    country,
    address,
    addedPhotos,
    city,
    state,
    description,
    from,
    to,
    modelYear
  } = req.body
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err
    const CarRentDoc = await CarRentModel.create({
      booked: info.id,
      title,
      country,
      address,
      photos: addedPhotos,
      city,
      state,
      description,
      from,
      to,
      modelYear
    })
    res.json(CarRentDoc)
  })
})

app.get("/api/car-rent", async (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  const { token } = req.cookies
  jwt.verify(token, secret, {}, async (err, userData) => {
    const { id } = userData
    res.json(await CarRentModel.find({ booked: id }))
  })
})

app.post("/api/book-experience", async (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  const { token } = req.cookies
  const {
    title,
    country,
    address,
    addedPhotos,
    city,
    state,
    description,
    from,
    to,
  } = req.body
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err
    const BookExperienceDoc = await BookExperienceModel.create({
      booked: info.id,
      title,
      country,
      address,
      photos: addedPhotos,
      city,
      state,
      description,
      from,
      to,
    })
    res.json(BookExperienceDoc)
  })
})

app.get("/api/book-experience", async (req, res) => {
  mongoose.connect(process.env.DATABASE_URL)
  const { token } = req.cookies
  jwt.verify(token, secret, {}, async (err, userData) => {
    const { id } = userData
    res.json(await BookExperienceModel.find({ booked: id }))
  })
})

app.post("/api/checkout", async (req, res) => {
  const place = req.body.items
  const price = req.body.price

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "USD",
          product_data: { name: place.title },
          unit_amount: price * 100
        },
        quantity: 1
      }
    ],
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `https://digitalbnb.ae/${place._id}/success`,
    cancel_url: `https://digitalbnb.ae/${place._id}/cancel`
  })
  res.json({ url: session.url })
})

app.post("/api/car-rent/checkout", async (req, res) => {
  const carsData = req.body.items
  const price = req.body.price

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "USD",
          product_data: { name: carsData.title },
          unit_amount: price * 100
        },
        quantity: 1
      }
    ],
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `https://digitalbnb.ae/${carsData._id}/success`,
    cancel_url: `https://digitalbnb.ae/${carsData._id}/cancel`
  })
  res.json({ url: session.url })
})

app.post("/api/book-experience/checkout", async (req, res) => {
  const experienceData = req.body.items
  const price = req.body.price

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "USD",
          product_data: { name: experienceData.title },
          unit_amount: price * 100
        },
        quantity: 1
      }
    ],
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `https://digitalbnb.ae/${experienceData._id}/success`,
    cancel_url: `https://digitalbnb.ae/${experienceData._id}/cancel`
  })
  res.json({ url: session.url })
})

app.listen(3000)
