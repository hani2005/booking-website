import React, { useContext, useEffect, useState } from "react"
import AccommodationsNav from "../components/AccommodationsNav"
import { amenities, categories } from "../data"
import {
  AiOutlineCloudUpload,
  AiOutlineMinus,
  AiOutlinePlus
} from "react-icons/ai"
import BigFooter from "../components/BigFooter"
import Modal from "../components/Modal"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"
import { FaTrash } from "react-icons/fa"
import { UserContext } from "../UserContext"

function RentAccommodation() {
  const { id } = useParams()
  const [title, setTitle] = useState("")
  const [address, setAddress] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [addedPhotos, setAddedPhotos] = useState([])
  const [description, setDescription] = useState("")
  const [perks, setPerks] = useState([])
  const [categoriesCheck, setCategoriesCheck] = useState([])
  const [extraInfo, setExtraInfo] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [maxGuests, setMaxGuests] = useState("")
  const [bedrooms, setBedrooms] = useState("")
  const [bathrooms, setBathrooms] = useState("")
  const [beds, setBeds] = useState("")
  const [price, setPrice] = useState("")
  const [redirect, setRedirect] = useState(false)

  const { setUserInfo, userInfo } = useContext(UserContext)
  useEffect(() => {
    fetch("http://localhost:3000/api/profile", {
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
    axios.get("/places/" + id).then((response) => {
      const { data } = response
      console.log(data)
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
      setPerks(data.perks)
      setCategoriesCheck(data.categoriesCheck)
      setMaxGuests(data.maxGuests)
      setPrice(data.price)
    })
  }, [id])

  async function savePlace(ev) {
    ev.preventDefault()
    const AccommodationData = {
      host: userInfo.username,
      title,
      address,
      country,
      state,
      city,
      description,
      addedPhotos,
      perks,
      price,
      categoriesCheck,
      maxGuests,
      beds,
      bedrooms,
      bathrooms
    }
    if (id) {
      // update
      await axios.put("/places", {
        id,
        ...AccommodationData
      })
      setRedirect(true)
    } else {
      // new place
      await axios.post("/places", AccommodationData)
      setRedirect(true)
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />
  }

  function handlePerksClick(ev) {
    const { checked, name } = ev.target
    if (checked) {
      setPerks([...perks, name])
    } else {
      setPerks([...perks.filter((selectedName) => selectedName !== name)])
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
        <AccommodationsNav />
        <form className="rent-accommodation-container" onSubmit={savePlace}>
          <div className="rent-accommodation-title">
            <h2>Which of these best describes your place?</h2>
            <span>Pick category</span>
          </div>
          <div className="perks">
            {categories.map((item) => (
              <label key={item.label}>
                <input
                  type="checkbox"
                  checked={categoriesCheck.includes(`${item.label}`)}
                  name={`${item.label}`}
                  onChange={handleCatClick}
                />
                <div className="perks-label">
                  <img src={item.icon} alt="" />
                  <h5>{item.label}</h5>
                </div>
              </label>
            ))}
          </div>
          <div className="rent-accommodation-title">
            <h2>Where is your place located?</h2>
            <span>Tell us where your place will be</span>
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
            <h2>Share some basics about your place</h2>
            <span>Add some details about your place space</span>
          </div>
          <div className="place-basics-container">
            <div className="place-basics">
              <h5>Guests</h5>
              <div className="place-basic-input">
                <input
                  type="text"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                />
              </div>
            </div>
            <div className="place-basics">
              <h5>Bedrooms</h5>
              <div className="place-basic-input">
                <input
                  type="text"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                />
              </div>
            </div>
            <div className="place-basics">
              <h5>Beds</h5>
              <div className="place-basic-input">
                <input
                  type="text"
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                />
              </div>
            </div>
            <div className="place-basics">
              <h5>Bathrooms</h5>
              <div className="place-basic-input">
                <input
                  type="text"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="rent-accommodation-title">
            <h2>Tell guests what your place has to offer</h2>
            <span>What amenities do you have?</span>
          </div>
          {/* selected={perks} onChange={setPerks} */}
          <div className="amenities-container">
            {amenities.map((item) => (
              <label key={item.amenitie}>
                <input
                  type="checkbox"
                  checked={perks.includes(`${item.amenitie}`)}
                  name={`${item.amenitie}`}
                  onChange={handlePerksClick}
                />
                <div className="amenities-label">
                  <img src={item.icon} alt="" />
                  <h5>{item.amenitie}</h5>
                </div>
              </label>
            ))}
          </div>
          <div className="rent-accommodation-title">
            <h2>Add some photos of you place</h2>
            <span>Show guests what your place looks like</span>
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
            <h2>How would you describe your place</h2>
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
            <span>How much do you charge per night</span>
          </div>
          <div className="place-price">
            <h4>$</h4>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <button className="save-btn">Save</button>
        </form>
        <BigFooter />
      </div>
    </>
  )
}

export default RentAccommodation
