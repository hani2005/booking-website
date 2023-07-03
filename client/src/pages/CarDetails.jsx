import React, { useContext, useEffect, useState } from "react"
import BigFooter from "../components/BigFooter"
import { DateRange } from "react-date-range"
import Modal from "../components/Modal"
import { Link, Navigate, useParams } from "react-router-dom"
import RentCarNav from "../components/RentCarNav"
import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file
import axios from "axios"
import { UserContext } from "../UserContext"
import { differenceInCalendarDays } from "date-fns"

function CarDetails() {
  const [nowPrice, setNowPrice] = useState()
  const [totalPrice, setTotalPrice] = useState(nowPrice)
  const [day, setDay] = useState()
  const [clicked, setClicked] = useState(false)
  const [review, setReview] = useState("")
  const [reviews, setReviews] = useState([])
  const [readMore, setReadMore] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    }
  ])

  const { id } = useParams()
  const [carsData, setCarsData] = useState(null)

  useEffect(() => {
    axios.get(`/car/${id}`).then((response) => {
      setCarsData(response.data)
      setNowPrice(response.data.price)
    })
  }, [])

  const [bookings, setBookings] = useState([0])
  useEffect(() => {
    axios.get("/car-rent").then((response) => {
      setBookings(response.data[0])
    })
  }, [])

  const { setUserInfo, userInfo } = useContext(UserContext)
  useEffect(() => {
    fetch("https://digitalbnb.ae/api/profile", {
      credentials: "include"
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo)
      })
    })
  }, [])

  useEffect(() => {
    if (state[0].startDate && state[0].endDate) {
      const dayCount = differenceInCalendarDays(
        state[0].endDate,
        state[0].startDate
      )

      if (dayCount && nowPrice) {
        setTotalPrice(dayCount * nowPrice + nowPrice)
      } else {
        setTotalPrice(nowPrice)
      }
      setDay(dayCount)
    }

    if (window.location.href.includes("success")) {
      // toast.success("Place has been successfully booked")
      RentThisCar()
      setTimeout(() => {
        setRedirect(true)
      }, 2000)
    }
  }, [state[0], nowPrice])

  async function RentThisCar() {
    await axios.post("/car-rent", {
      from: state[0].startDate,
      to: state[0].endDate,
      title: carsData.title,
      country: carsData.country,
      address: carsData.address,
      addedPhotos: carsData.photos,
      city: carsData.city,
      state: carsData.state,
      description: carsData.description,
      modelYear: carsData.modelYear
    })
  }

  const checkout = async () => {
    await fetch("https://digitalbnb.ae/api/car-rent/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ items: carsData, price: totalPrice })
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url) // Forwarding user to Stripe
        }
      })
  }

  const resetForm = (e) => {
    e.preventDefault()
    setReview("")
    setClicked(false)
  }

  const submitReview = (e) => {
    e.preventDefault()
    const newReview = {
      description: review
    }
    setReviews([...reviews, newReview])
    resetForm(e)
  }

  if (!carsData) return ""

  if (redirect) {
    return <Navigate to={"/"} />
  }

  return (
    <div className="car-details-page">
      <RentCarNav />
      <Modal />
      <h2 className="place-title">{carsData.title}</h2>
      <div className="place-subtitle">
        <h5>{reviews.length} reviews</h5>
        <p>
          {carsData.address}, {carsData.country}
        </p>
      </div>
      <div className="img-container">
        <img src={carsData.photos[0]} alt="" className="mainImg" />
        <div className="small-img-container">
          <img src={carsData.photos[1]} alt="" />
          <img src={carsData.photos[2]} alt="" className="img2" />
          <img src={carsData.photos[3]} alt="" />
          <img src={carsData.photos[4]} alt="" className="img4" />
        </div>
      </div>
      <div className="place-details-container">
        <div className="place-details">
          <h1>
            Car hosted by Ahmed <span>{carsData.host}</span>
          </h1>
          <div className="desc-container">
            <h2>About This Car</h2>
            <p>
              {readMore
                ? carsData.description
                : `${carsData.description.substring(0, 200)}...`}
              <button onClick={() => setReadMore(!readMore)}>
                {readMore ? "Show less" : "Show more"}
              </button>
            </p>
          </div>
          <div className="offers">
            <h2>What This Place Offers</h2>
            <div className="offer-detail">
              {showMore
                ? carsData.features.map((feature) => (
                    <span key={feature}>{feature}</span>
                  ))
                : carsData.features
                    .slice(0, 4)
                    .map((feature) => <span key={feature}>{feature}</span>)}
            </div>
            <button onClick={() => setShowMore(!showMore)}>
              Show all {carsData.features.length} features
            </button>
          </div>
        </div>
        <div className="book">
          <div className="book-price-detail">
            <span className="book-price">
              <strong>${carsData.price}</strong>/day
            </span>
            <div className="book-perfomance">
              <span className="book-reviews">{reviews.length} reviews</span>
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
            <Link onClick={checkout}>Reserve</Link>
            <span>You won't be charged yet</span>
            <hr />
            <div className="book-total">
              <h5>Total</h5>
              <p>${totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="date-picker">
        <h2>{day + 1} Days</h2>
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
          <h5>{reviews.length} reviews</h5>
        </div>
        <div className="review-profile-container">
          {bookings?.booked ? (
            <div className="review-profile-content">
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <button onClick={(e) => submitReview(e)} disabled={review === ""}>
                Submit
              </button>
              <div className="review-profile">
                {reviews.map((r) => {
                  return (
                    <div key={reviews} className="review-profile-text">
                      <h5>{userInfo.username}</h5>
                      <p>{r.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="review-profile">
              {reviews.map((r) => {
                return (
                  <div key={reviews} className="review-profile-text">
                    <h5>{userInfo.username}</h5>
                    <p>{r.description}</p>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
      <BigFooter />
    </div>
  )
}

export default CarDetails
