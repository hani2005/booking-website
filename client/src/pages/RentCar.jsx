import React from "react"
import RentCarNav from "../components/RentCarNav"
import Modal from "../components/Modal"
import SmallFooter from "../components/SmallFooter"
import banner from "../assets/dubai-banner.mp4"
import { carsCategories, carsData } from "../data"
import { Link } from "react-router-dom"

function RentCar() {
  window.scrollBy(0,300)
  return (
    <>
      <div className="homepage">
        <RentCarNav />
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
        {carsCategories.map((item) => (
          <div key={item.label} className="cars-categories">
            <img src={item.icon} alt="" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <div className="carsData-container">
        {carsData.map((item) => (
          <Link to={`/car-details/${item.id}`} key={item.id} className="carsData-content">
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

export default RentCar
