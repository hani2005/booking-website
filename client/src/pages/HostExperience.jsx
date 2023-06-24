import React, { useContext, useEffect, useState } from "react"
import Modal from "../components/Modal"
import ExperienceNav from "../components/ExperienceNav"
import { experienceCategories, perks } from "../data"
import { AiOutlineCloudUpload } from "react-icons/ai"
import BigFooter from "../components/BigFooter"
import { UserContext } from "../UserContext"
import axios from "axios"
import { Navigate, useParams } from "react-router-dom"
import { FaTrash } from "react-icons/fa"

function HostExperience() {
  const { id } = useParams()
  const [title, setTitle] = useState("")
  const [address, setAddress] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [addedPhotos, setAddedPhotos] = useState([])
  const [description, setDescription] = useState("")
  const [included, setIncluded] = useState([])
  const [categoriesCheck, setCategoriesCheck] = useState([])
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
      setTitle(data.title)
      setAddress(data.address)
      setCountry(data.country)
      setCity(data.city)
      setState(data.state)
      setAddedPhotos(data.photos)
      setDescription(data.description)
      setIncluded(data.included)
      setCategoriesCheck(data.categoriesCheck)
      setPrice(data.price)
    })
  }, [id])

  async function savePlace(ev) {
    ev.preventDefault()
    const ExperienceData = {
      host: userInfo.username,
      title,
      address,
      country,
      state,
      city,
      description,
      addedPhotos,
      included,
      price,
      categoriesCheck
    }
    if (id) {
      // update
      await axios.put("/experience", {
        id,
        ...ExperienceData
      })
      setRedirect(true)
    } else {
      // new place
      await axios.post("/experience", ExperienceData)
      setRedirect(true)
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />
  }

  function handlePerksClick(ev) {
    const { checked, name } = ev.target
    if (checked) {
      setIncluded([...included, name])
    } else {
      setIncluded([...included.filter((selectedName) => selectedName !== name)])
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
        <ExperienceNav />
        <form className="rent-accommodation-container" onSubmit={savePlace}>
          <div className="rent-accommodation-title">
            <h2>Which of these best describes your experience?</h2>
            <span>Pick category</span>
          </div>
          <div className="perks">
            {experienceCategories.map((item) => (
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
            <h2>Where is your experience located?</h2>
            <span>Tell us where your experience will be</span>
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
            <h2>What's included</h2>
            <span>What perks do you have?</span>
          </div>
          <div className="amenities-container">
            {perks.map((item) => (
              <label key={item.perk}>
                <input
                  type="checkbox"
                  checked={included.includes(`${item.perk}`)}
                  name={`${item.perk}`}
                  onChange={handlePerksClick}
                />
                <div className="amenities-label">
                  <img src={item.icon} alt="" />
                  <h5>{item.perk}</h5>
                </div>
              </label>
            ))}
          </div>
          <div className="rent-accommodation-title">
            <h2>Add some photos of you experience</h2>
            <span>Show guests what your experience looks like</span>
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
            <h2>How would you describe your experience</h2>
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
            <span>How much do you charge per person</span>
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

export default HostExperience
