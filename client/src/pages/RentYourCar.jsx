import React, { useContext, useEffect, useState } from "react"
import BigFooter from "../components/BigFooter"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { carFeatures } from "../data"
import { carsCategories } from "../data"
import RentCarNav from "../components/RentCarNav"
import Modal from "../components/Modal"
import { UserContext } from "../UserContext"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"
import { FaTrash } from "react-icons/fa"

function RentYourCar() {
  const [modelYear, setModelYear] = useState("")
  const [country, setCountry] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const { id } = useParams()
  const [title, setTitle] = useState("")
  const [addedPhotos, setAddedPhotos] = useState([])
  const [description, setDescription] = useState("")
  const [features, setFeatures] = useState([])
  const [categoriesCheck, setCategoriesCheck] = useState([])
  const [price, setPrice] = useState("")
  const [redirect, setRedirect] = useState(false)

  const { setUserInfo, userInfo } = useContext(UserContext)
  useEffect(() => {
    fetch("https://booking-website-rho.vercel.app/api/profile", {
      credentials: "include"
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo)
      })
    })
  }, [])

  useEffect(() => {
    if (!id) {
      return
    }
    axios.get("/car/" + id).then((response) => {
      const { data } = response
      setTitle(data.title)
      setAddress(data.address)
      setCountry(data.country)
      setCity(data.city)
      setState(data.state)
      setAddedPhotos(data.photos)
      setBathrooms(data.bathrooms)
      setBedrooms(data.bedrooms)
      setBeds(data.beds)
      setDescription(data.description)
      setFeatures(data.features)
      setCategoriesCheck(data.categoriesCheck)
      setModelYear(data.modelYear)
      setPrice(data.price)
    })
  }, [id])

  async function savePlace(ev) {
    ev.preventDefault()
    const CarData = {
      host: userInfo.username,
      title,
      address,
      country,
      state,
      city,
      description,
      addedPhotos,
      features,
      price,
      categoriesCheck,
      modelYear
    }
    if (id) {
      // update
      await axios.put("/car", {
        id,
        ...CarData
      })
      setRedirect(true)
    } else {
      // new place
      await axios.post("/car", CarData)
      setRedirect(true)
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />
  }

  function handlePerksClick(ev) {
    const { checked, name } = ev.target
    if (checked) {
      setFeatures([...features, name])
    } else {
      setFeatures([...features.filter((selectedName) => selectedName !== name)])
    }
  }

  function handleCatClick(ev) {
    const { checked, name } = ev.target
    if (checked) {
      setCategoriesCheck([...categoriesCheck, name])
    } else {
      setCategoriesCheck([
        ...categoriesCheck.filter((selectedName) => selectedName !== name)
      ])
    }
  }

  function uploadPhoto(ev) {
    const files = ev.target.files
    const data = new FormData()
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i])
    }
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" }
      })
      .then((response) => {
        const { data: filenames } = response
        setAddedPhotos((prev) => {
          return [...prev, ...filenames]
        })
      })
  }

  function removePhoto(ev, filename) {
    ev.preventDefault()
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)])
  }

  return (
    <>
      <Modal />
      <div className="rent-accommodation">
        <RentCarNav />
        <form className="rent-accommodation-container" onSubmit={savePlace}>
          <div className="rent-accommodation-title">
            <h2>Which of these best describes your car brand?</h2>
            <span>Pick a brand</span>
          </div>
          <div className="perks">
            {carsCategories.map((item) => (
              <label key={item.label}>
                <input
                  type="checkbox"
                  checked={categoriesCheck.includes(`${item.label}`)}
                  name={`${item.label}`}
                  onChange={handleCatClick}
                />
                <div className="car-perks-label">
                  <img src={item.icon} alt="" />
                  <h5>{item.label}</h5>
                </div>
              </label>
            ))}
          </div>
          <div className="rent-accommodation-title">
            <h2>Where is your car located?</h2>
            <span>Tell us where your car will be</span>
          </div>
          <div className="location-container">
            <input
              type="text"
              placeholder="Country/Region"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="City/Village"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="State/Province"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="rent-accommodation-title">
            <h2>Model</h2>
            <span>What is your car model</span>
          </div>
          <input
            type="text"
            placeholder="2030"
            value={modelYear}
            onChange={(e) => setModelYear(e.target.value)}
            className="model"
          />
          <div className="rent-accommodation-title">
            <h2>Features</h2>
            <span>What features does your car have?</span>
          </div>
          <div className="amenities-container">
            {carFeatures.map((item) => (
              <label key={item.carFeature}>
                <input
                  type="checkbox"
                  checked={features.includes(`${item.carFeature}`)}
                  name={`${item.carFeature}`}
                  onChange={handlePerksClick}
                />
                <div className="amenities-label">
                  <img src={item.icon} alt="" />
                  <h5>{item.carFeature}</h5>
                </div>
              </label>
            ))}
          </div>
          <div className="rent-accommodation-title">
            <h2>Add some photos of you car</h2>
            <span>Show guests what your car looks like</span>
          </div>
          <div className="places-upload">
            <label className="upload-photo-button">
              <AiOutlineCloudUpload className="upload-icon" />
              <p>Click here to upload</p>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={uploadPhoto}
              />
            </label>
            <div className="uploaded-photos">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div>
                    <img key={link} src={link} alt="" />
                    <button onClick={(ev) => removePhoto(ev, link)}>
                      <span>Remove</span> <FaTrash />
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <div className="rent-accommodation-title">
            <h2>How would you describe your car</h2>
            <span>Sweet and short works the best</span>
          </div>
          <div className="place-title-input">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="rent-accommodation-title">
            <h2>Now, set your price</h2>
            <span>How much do you charge per trip</span>
          </div>
          <div className="place-price">
            <h4>$</h4>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}/>
          </div>
          <button className="save-btn">Save</button>
        </form>
        <BigFooter />
      </div>
    </>
  )
}

export default RentYourCar
