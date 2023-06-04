import React from 'react'
import { Link } from 'react-router-dom'
import ExperienceNav from '../components/ExperienceNav'
import Modal from '../components/Modal'
import banner from "../assets/dubai-banner.mp4"
import { experienceCategories, experienceData } from '../data'
import SmallFooter from '../components/SmallFooter'

function Experiences() {
  return (
    <>
    <div className="homepage">
      <ExperienceNav />
      <Modal />
      <h1>
        The Best Vacation Rental Apartments, Luxury Cars & Experiences in
        Dubai
      </h1>
    </div>
    <video
      className="banner"
      src={banner}
      muted
      autoPlay
      loop
      type="video/mp4"
    ></video>
    <div className="cars-categories-container">
      {experienceCategories.map((item) => (
        <div key={item.label} className="cars-categories">
          <span>{item.label}</span>
        </div>
      ))}
    </div>
    <div className="carsData-container">
      {experienceData.map((item) => (
        <Link to={`/experience/${item.id}`} key={item.id} className="carsData-content">
          <img src={item.mainImg} alt="" />
          <h4>{item.title}</h4>
          <span>{item.location}</span>
          <span>{item.model}</span>
          <h5>${item.price}</h5>
        </Link>
      ))}
    </div>
    <SmallFooter />
  </>
  )
}

export default Experiences