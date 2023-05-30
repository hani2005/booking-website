import React from "react"
import AccommodationsNav from "../components/AccommodationsNav"
import { amenities, categories } from "../data"
import {
  AiOutlineCloudUpload,
  AiOutlineMinus,
  AiOutlinePlus
} from "react-icons/ai"

function RentAccommodation() {
  return (
    <div className="rent-accommodation">
      <AccommodationsNav />
      <div className="rent-accommodation-container">
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
          <input type="text" placeholder="Country/Region" />
          <input type="text" placeholder="Address" />
          <input type="text" placeholder="City/Village" />
          <input type="text" placeholder="State/Province" />
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
          {amenities.map((item) => (
            <label key={item.amenitie}>
              <input type="checkbox" />
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
    </div>
  )
}

export default RentAccommodation
