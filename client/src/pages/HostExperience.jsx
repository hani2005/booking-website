import React, { useState } from "react"
import Modal from "../components/Modal"
import ExperienceNav from "../components/ExperienceNav"
import { experienceCategories, perks } from "../data"
import { AiOutlineCloudUpload, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import BigFooter from "../components/BigFooter"

function HostExperience() {
  const [country, setCountry] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  return (
    <>
      <Modal />
      <div className="rent-accommodation">
        <ExperienceNav />
        <div className="rent-accommodation-container">
          <div className="rent-accommodation-title">
            <h2>Which of these best describes your experience?</h2>
            <span>Pick category</span>
          </div>
          <div className="perks">
            {experienceCategories.map((item) => (
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
                <input type="checkbox" />
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
          <label className="places-upload">
            <div>
              <AiOutlineCloudUpload className="upload-icon" />
              <p>Click here to upload</p>
            </div>
            <input type="file" />
          </label>
          <div className="rent-accommodation-title">
            <h2>How would you describe your experience</h2>
            <span>Sweet and short works the best</span>
          </div>
          <div className="place-title-input">
            <input type="text" placeholder="Title" />
            <textarea placeholder="Description" />
          </div>
          <div className="rent-accommodation-title">
            <h2>Now, set your price</h2>
            <span>How much do you charge per person</span>
          </div>
          <div className="place-price">
            <h4>$</h4>
            <input type="text" />
          </div>
          <button>Save</button>
        </div>
        <BigFooter />
      </div>
    </>
  )
}

export default HostExperience
