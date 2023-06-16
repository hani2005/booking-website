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
const axios = require("axios")
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3")
const fs = require("fs")

// bcrypt password
const salt = bcrypt.genSaltSync(10)

// jwt secret
const secret = "sasofasfo43ogoeg5546p45kpojhuu21y8e1"
const bucket = 'digital-bnb';

mongoose.connect(process.env.DATABASE_URL)

app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Here")
})

async function uploadToS3(path, originalFilename, mimetype) {
  const client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originalFilename.split('.');
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + '.' + ext;
  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Body: fs.readFileSync(path),
    Key: newFilename,
    ContentType: mimetype,
    ACL: 'public-read',
  }));
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

const photosMiddleware = multer({dest:'/tmp'});
app.post('/upload', photosMiddleware.array('photos', 100), async (req,res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const {path,originalname,mimetype} = req.files[i];
    const url = await uploadToS3(path, originalname, mimetype);
    uploadedFiles.push(url);
  }
  res.json(uploadedFiles);
});

// app.post("/authenticate", async (req, res) => {
//   const { username } = req.body
//   return res.json({ username: username, secret: "sha256..." })
// })

app.post("/register", async (req, res) => {
  // mongoose.connect(process.env.DATABASE_URL)
  const { username, password } = req.body
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt)
    })
    res.json(userDoc)
    await axios.post(
      "https://api.chatengine.io/users/",
      { username: username, secret: password, first_name: username },
      { headers: { "Private-Key": "16294a01-98b7-4ce5-ab44-8eab38163906" } }
    )
    res.status(r.status).json(r.data)
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

// mongoose.connect(process.env.MONGO_URL)
app.post("/places", (req, res) => {
  const { token } = req.cookies
  const { title, country, city, state, address, description, price, perks, maxGuests, beds, bathrooms, bedrooms, categoriesCheck } =
    req.body
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err
    const AccommodationDoc = await AccommodationModel.create({
      owner: info.id,
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
      bathrooms
    })
    res.json(AccommodationDoc)
  })
})

app.get("/places/:id", async (req, res) => {
  // mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params
  res.json(await AccommodationModel.findById(id))
})

app.get("/places", async (req, res) => {
  // mongoose.connect(process.env.MONGO_URL);
  res.json(await AccommodationModel.find())
})

app.listen(3000)
