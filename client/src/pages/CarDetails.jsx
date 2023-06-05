import React, { useState } from "react"
import BigFooter from "../components/BigFooter"
import { DateRange } from "react-date-range"
import { AiFillStar } from "react-icons/ai"
import Modal from "../components/Modal"
import { useParams } from "react-router-dom"
import { carFeatures, carsData, reviewsData } from "../data"
import RentCarNav from "../components/RentCarNav"

function CarDetails() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    }
  ])

  const { id } = useParams()
  const car = carsData.find((car) => car.id === id)
  const {
    mainImg,
    img1,
    img2,
    img3,
    img4,
    title,
    location,
    desc,
    price,
    offer1,
    offer2,
    offer3,
    offer4,
    reviews,
    rate
  } = car

  return (
    <div className="accommodation-page">
      <RentCarNav />
      <Modal />
      <h2 className="place-title">{title}</h2>
      <div className="place-subtitle">
        <div className="place-rate">
          <AiFillStar />
          <span>{rate}</span>
        </div>
        <h5>{reviews} reviews</h5>
        <p>{location}</p>
      </div>
      <div className="img-container">
        <img src={mainImg} alt="" className="mainImg" />
        <div className="small-img-container">
          <img src={img1} alt="" />
          <img src={img2} alt="" className="img2" />
          <img src={img3} alt="" />
          <img src={img4} alt="" className="img4" />
        </div>
      </div>
      <div className="place-details-container">
        <div className="place-details">
          <h1>Room in a rental unit hosted by Ahmed</h1>
          <div className="desc-container">
            <h2>About This Place</h2>
            <p>{desc}</p>
          </div>
          <div className="offers">
            <h2>What This Place Offers</h2>
            <div className="offer-detail">
              {carFeatures.slice(0, 6).map((item) => (
                <div key={item.carFeature} className="amenities">
                  <img src={item.icon} alt="" />
                  <span>{item.carFeature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="book">
          <div className="book-price-detail">
            <span className="book-price">
              <strong>${price}</strong>/night
            </span>
            <div className="book-perfomance">
              <div className="book-rate">
                <AiFillStar />
                <span>{rate}</span>
              </div>
              <span className="book-reviews">{reviews} reviews</span>
            </div>
          </div>
          <div className="box">
            <DateRange
              rangeColors={["#000000"]}
              onChange={(item) => setState([item.selection])}
              ranges={state}
              minDate={new Date()}
              date={new Date()}
              showDateDisplay={false}
            />
          </div>
          <div className="reserve">
            <button>Reserve</button>
            <span>You won't be charged yet</span>
            <hr />
            <div className="book-total">
              <h5>Total</h5>
              <p>${price}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="date-picker">
        <h2>7 Nights in Dubai</h2>
        <DateRange
          rangeColors={["#000000"]}
          onChange={(item) => setState([item.selection])}
          ranges={state}
          minDate={new Date()}
          date={new Date()}
        />
      </div>
      <div className="reviews-container">
        <div className="review-header">
          <div className="review-header-rate">
            <AiFillStar />
            <h5>{rate}</h5>
          </div>
          <h5>{reviews} reviews</h5>
        </div>
        <div className="review-profile-container">
          {reviewsData.map((item) => (
            <div className="review-profile-content">
              <div className="review-profile">
                <img src={item.img} alt="" />
                <div className="review-profile-text">
                  <h5>{item.name}</h5>
                  <span>{item.date}</span>
                </div>
              </div>
              <p>{item.review}</p>
            </div>
          ))}
        </div>
      </div>
      <BigFooter />
    </div>
  )
}

export default CarDetails
