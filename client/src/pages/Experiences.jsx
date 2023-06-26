import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ExperienceNav from "../components/ExperienceNav"
import Modal from "../components/Modal"
import banner from "../assets/dubai-banner.mp4"
import { experienceCategories, experienceData } from "../data"
import SmallFooter from "../components/SmallFooter"
import axios from "axios"

function Experiences() {
  const [experienceData, setExperienceData] = useState([])
  useEffect(() => {
    axios.get("/experience").then((response) => {
      setExperienceData(response.data)
    })
  }, [])

  return (
    <>
      <div className="homepage">
        <ExperienceNav />
        <Modal />
        <h1>
          The Best Vacation Rental Apartments, Luxury Cars & Experiences in
          Dubai
        </h1>
        <div className="experience-categories-container">
          {experienceCategories.map((item) => (
            <div key={item.label} className="experience-categories">
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <video
        className="banner"
        src={banner}
        muted
        autoPlay
        loop
        type="video/mp4"
      ></video>
      <div className="mob-experience-categories-container">
        {experienceCategories.map((item) => (
          <div key={item.label} className="experience-categories">
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <div className="experienceData-container">
        {experienceData.map((item) => (
          <Link
            to={`/experience/${item._id}`}
            key={item._id}
            className="experienceData-content"
          >
            <img src={item.photos[0]} alt="" />
            <h5>{item.city}</h5>
            <span>{item.title}</span>
            <p>
              <strong>Person:</strong> {item.price}
            </p>
          </Link>
        ))}
      </div>
      <SmallFooter />
    </>
  )
}

export default Experiences
