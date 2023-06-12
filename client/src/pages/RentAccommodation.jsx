import React, { useEffect, useState } from "react"
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
  const [extraInfo, setExtraInfo] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [maxGuests, setMaxGuests] = useState(1)
  const [bedrooms, setBedrooms] = useState(1)
  const [bathrooms, setBathrooms] = useState(1)
  const [baths, setBaths] = useState(1)
  const [price, setPrice] = useState("")
  const [redirect, setRedirect] = useState(false)
  useEffect(() => {
    if (!id) {
      return
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response
      setTitle(data.title)
      setAddress(data.address)
      setCountry(data.country)
      setCity(data.city)
      setState(data.state)
      // setAddedPhotos(data.photos)
      setBathrooms(data.bathrooms)
      setBedrooms(data.bedrooms)
      setBaths(data.baths)
      setDescription(data.description)
      setPerks(data.perks)
      // setExtraInfo(data.extraInfo)
      // setCheckIn(data.checkIn)
      // setCheckOut(data.checkOut)
      setMaxGuests(data.maxGuests)
      setPrice(data.price)
    })
  }, [id])

  async function savePlace(ev) {
    ev.preventDefault()
    const AccommodationData = {
      title,
      address,
      country,
      state,
      city,
      description,
      perks,
      price
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

  function handleCbClick(ev) {
    const { checked, name } = ev.target
    if (checked) {
      setPerks([...perks, name])
    } else {
      setPerks([...perks.filter((selectedName) => selectedName !== name)])
    }
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
                <input type="checkbox" />
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
                <AiOutlineMinus />
                <span>1</span>
                <AiOutlinePlus />
              </div>
            </div>
            <div className="place-basics">
              <h5>Bedrooms</h5>
              <div className="place-basic-input">
                <AiOutlineMinus />
                <span>1</span>
                <AiOutlinePlus />
              </div>
            </div>
            <div className="place-basics">
              <h5>Beds</h5>
              <div className="place-basic-input">
                <AiOutlineMinus />
                <span>1</span>
                <AiOutlinePlus />
              </div>
            </div>
            <div className="place-basics">
              <h5>Bathrooms</h5>
              <div className="place-basic-input">
                <AiOutlineMinus />
                <span>1</span>
                <AiOutlinePlus />
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
                  onChange={handleCbClick}
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
          <label className="places-upload">
            <div>
              <AiOutlineCloudUpload className="upload-icon" />
              <p>Click here to upload</p>
            </div>
            <input type="file" />
          </label>
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
