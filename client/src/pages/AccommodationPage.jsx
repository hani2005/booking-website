import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import AccommodationsNav from "../components/AccommodationsNav"
import placesData, { amenities, reviewsData } from "../data"
import { AiFillStar } from "react-icons/ai"
import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file
import { DateRange } from "react-date-range"
import BigFooter from "../components/BigFooter"
import Modal from "../components/Modal"
import axios from "axios"

function AccommodationPage() {
  const [readMore, setReadMore] = useState(false)
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    }
  ])

  const { id } = useParams()
  const [place, setPlace] = useState(null)
  useEffect(() => {
    // if (!id) {
    //   return;
    // }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data)
    })
  }, [id])

  if (!place) return ""

  return (
    <div className="accommodation-page">
      <AccommodationsNav />
      <Modal />
      <h2 className="place-title">{place.title}</h2>
      <div className="place-subtitle">
        <div className="place-rate">
          <AiFillStar />
          <span>0.0</span>
        </div>
        <h5>0 reviews</h5>
        <p>
          {place.address}, {place.country}
        </p>
      </div>
      <div className="img-container">
        <img src={place.photos[0]} alt="" className="mainImg" />
        <div className="small-img-container">
          <img src={place.photos[1]} alt="" />
          <img src={place.photos[2]} alt="" className="img2" />
          <img src={place.photos[3]} alt="" />
          <img src={place.photos[4]} alt="" className="img4" />
        </div>
      </div>
      <div className="place-details-container">
        <div className="place-details">
          <h1>Room in a rental unit hosted by Ahmed</h1>
          <div className="desc-container">
            <h2>About This Place</h2>
            <p>
              {readMore
                ? place.description
                : `${place.description.substring(0, 200)}...`}
              <button onClick={() => setReadMore(!readMore)}>
                {readMore ? "Show less" : "Show more"}
              </button>
            </p>
          </div>
          <div className="offers">
            <h2>What This Place Offers</h2>
            <div className="offer-detail">
              {place.perks.slice(0, 6).map((perk) => (
                <span>{perk}</span>
              ))}
            </div>
            <button>Show all {place.perks.length} amenities</button>
          </div>
        </div>
        <div className="book">
          <div className="book-price-detail">
            <span className="book-price">
              <strong>${place.price}</strong>/night
            </span>
            <div className="book-perfomance">
              <div className="book-rate">
                <AiFillStar />
                <span>0.0</span>
              </div>
              <span className="book-reviews">0 reviews</span>
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
            <Link to={"/checkout"}>Reserve</Link>
            <span>You won't be charged yet</span>
            <hr />
            <div className="book-total">
              <h5>Total</h5>
              <p>${place.price}</p>
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
            <h5>0.0</h5>
          </div>
          <h5>0 reviews</h5>
        </div>
        <div className="review-profile-container">
          {reviewsData.map((item) => (
            <div key={item.id} className="review-profile-content">
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
      {/* <h2 className="extra-info-title">Things To Know</h2>
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
      </div> */}
      <BigFooter />
    </div>
  )
}

export default AccommodationPage
