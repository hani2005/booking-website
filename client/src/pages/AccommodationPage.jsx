import React, { useContext, useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import AccommodationsNav from "../components/AccommodationsNav"
import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file
import { DateRange, Range, RangeKeyDict } from "react-date-range"
import BigFooter from "../components/BigFooter"
import Modal from "../components/Modal"
import axios from "axios"
import { differenceInCalendarDays, format } from "date-fns"
import { Toaster, toast } from "react-hot-toast"
import { UserContext } from "../UserContext"

function AccommodationPage() {
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
  const [place, setPlace] = useState(null)

  useEffect(() => {
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data)
      setNowPrice(response.data.price)
    })
  }, [])

  const [bookings, setBookings] = useState([0])
  useEffect(() => {
    axios.get("/bookings").then((response) => {
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
      bookThisPlace()
      setTimeout(() => {
        setRedirect(true)
      }, 2000)
    }
    if (window.location.href.includes("cancel")) {
      // toast.success("Place has been successfully booked")
      setRedirect(true)
    }
  }, [state[0], nowPrice])

  async function bookThisPlace() {
    await axios.post("/bookings", {
      checkIn: state[0].startDate,
      checkOut: state[0].endDate,
      totalPrice: place.totalPrice,
      title: place.title,
      country: place.country,
      address: place.address,
      addedPhotos: place.photos,
      city: place.city,
      state: place.state,
      description: place.description,
      beds: place.beds,
      bathrooms: place.bathrooms,
      bedrooms: place.bedrooms,
      maxGuests: place.maxGuests
    })
  }

  const checkout = async () => {
    await fetch("https://digitalbnb.ae/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ items: place, price: totalPrice })
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

  if (!place) return ""

  if (redirect) {
    return <Navigate to={"/"} />
  }

  return (
    <div className="accommodation-page">
      {/* <div>
          <Toaster />
        </div> */}
      <AccommodationsNav />
      <Modal />
      <h2 className="place-title">{place.title}</h2>
      <div className="place-subtitle">
        <h5>{reviews.length} reviews</h5>
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
          <h1>
            Room in a rental unit hosted by <span>{place.host}</span>
          </h1>
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
              {showMore
                ? place.perks.map((perk) => <span>{perk}</span>)
                : place.perks.slice(0, 4).map((perk) => <span>{perk}</span>)}
            </div>
            <button onClick={() => setShowMore(!showMore)}>
              Show all {place.perks.length} amenities
            </button>
          </div>
        </div>
        <div className="book">
          <div className="book-price-detail">
            <span className="book-price">
              <strong>${place.price}</strong>/night
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
              <p>
                <span>${totalPrice}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="date-picker">
        <h2>{day + 1} Nights in Dubai</h2>
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
                    <div className="review-profile-text">
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
                  <div className="review-profile-text">
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

export default AccommodationPage
