import React, { useState } from "react"
import { useParams } from "react-router-dom"
import AccommodationsNav from "../components/AccommodationsNav"
import placesData, { amenities } from "../data"
import { AiFillStar } from "react-icons/ai"

import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file
import { DateRange } from "react-date-range"
import BigFooter from "../components/BigFooter"
import Modal from "../components/Modal"

function AccommodationPage() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    }
  ])

  const { id } = useParams()
  const place = placesData.find((place) => place.id === id)
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
    checkIn,
    checkOut,
    maxGuests,
    reviews,
    rate
  } = place

  return (
    <div className="accommodation-page">
      <AccommodationsNav />
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
              {amenities.slice(0, 6).map((item) => (
                <div key={item.amenitie} className="amenities">
                  <img src={item.icon} alt="" />
                  <span>{item.amenitie}</span>
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
      <h2 className="extra-info-title">Things To Know</h2>
      <div className="extra-info">
        <div className="info-detail">
          <span>
            <strong>House rules</strong>
          </span>
          <span>{checkIn}</span>
          <span>{checkOut}</span>
          <span>{maxGuests}</span>
        </div>
        <div className="info-detail">
          <span>
            <strong>Safety & property</strong>
          </span>
          <span>Carbon monoxide alarm not reported</span>
          <span>Smoke alarm not reported</span>
          <span>Pool/hot tub without a gate or lock</span>
        </div>
        <div className="info-detail">
          <span>
            <strong>Cancellation policy</strong>
          </span>
          <span>Free cancellation for 48 hours.</span>
          <p>
            Review the Host's full cancellation policy which
            <br /> applies even if you cancel for illness or disruptions
            <br /> caused by COVID-19.
          </p>
        </div>
      </div>
      <BigFooter />
    </div>
  )
}

export default AccommodationPage
