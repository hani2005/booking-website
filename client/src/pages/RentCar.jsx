import React, { useEffect, useState } from "react"
import RentCarNav from "../components/RentCarNav"
import Modal from "../components/Modal"
import SmallFooter from "../components/SmallFooter"
import banner from "../assets/dubai.mp4"
import { carsCategories, carsData } from "../data"
import { Link } from "react-router-dom"
import axios from "axios"

function RentCar() {
  const [carsData, setCarsData] = useState([])
  useEffect(() => {
    axios.get("/car").then((response) => {
      setCarsData(response.data)
    })
  }, [])

  return (
    <>
      <div className="homepage">
        <RentCarNav />
        <Modal />
        <h1>
          The Best Vacation Rental Apartments, Luxury Cars & Experiences in
          Dubai
        </h1>
        <div className="cars-categories-container">
          {carsCategories.map((item) => (
            <div key={item.label} className="cars-categories">
              <img src={item.icon} alt="" />
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
      <div className="carsData-container">
        {carsData.map((item) => (
          <Link
            to={`/car-details/${item._id}`}
            key={item._id}
            className="carsData-content"
          >
            <img src={item.photos[0]} alt="" />
            <h5>{item.address}</h5>
            <span>{item.title}</span>
            <span>
              <strong>Model:</strong> {item.modelYear}
            </span>
            <p>
              <strong>Day:</strong> {item.price}
            </p>
          </Link>
        ))}
      </div>
      <SmallFooter />
    </>
  )
}

export default RentCar
