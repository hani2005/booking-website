import React, { useState } from 'react'
import BigFooter from '../components/BigFooter'
import { AiOutlineCloudUpload, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { carFeatures } from '../data'
import { carsCategories } from '../data'
import RentCarNav from "../components/RentCarNav"
import Modal from '../components/Modal'

function RentYourCar() {
  const [country, setCountry] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  return (
    <>
      <Modal />
      <div className="rent-accommodation">
        <RentCarNav />
        <div className="rent-accommodation-container">
          <div className="rent-accommodation-title">
            <h2>Which of these best describes your place?</h2>
            <span>Pick category</span>
          </div>
          <div className="perks">
            {carsCategories.map((item) => (
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
          <div className="amenities-container">
            {carFeatures.map((item) => (
              <label key={item.carFeature}>
                <input type="checkbox" />
                <div className="amenities-label">
                  <img src={item.icon} alt="" />
                  <h5>{item.carFeature}</h5>
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
            <input type="text" placeholder="Title" />
            <textarea placeholder="Description" />
          </div>
          <div className="rent-accommodation-title">
            <h2>Now, set your price</h2>
            <span>How much do you charge per night</span>
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

export default RentYourCar