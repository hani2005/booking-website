import React, { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import AccommodationsNav from "../components/AccommodationsNav"
import placesData, { amenities, reviewsData } from "../data"
import { AiFillStar } from "react-icons/ai"
import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file
import { DateRange, Range, RangeKeyDict } from "react-date-range"
import BigFooter from "../components/BigFooter"
import Modal from "../components/Modal"
import axios from "axios"
import {
  differenceInCalendarDays,
  differenceInDays,
  eachDayOfInterval,
  format
} from "date-fns"
import { IoCloseSharp } from "react-icons/io5"
import { IoIosArrowBack } from "react-icons/io"
import { Toaster, toast } from "react-hot-toast"

function AccommodationPage() {
  const [backDrop, setBackDrop] = useState("backdrop")
  const [aside, setAside] = useState("aside")
  const [nowPrice, setNowPrice] = useState()
  const [totalPrice, setTotalPrice] = useState(nowPrice)
  const [day, setDay] = useState()
  const [OrderAdress, setOrderAddress] = useState("")
  const [OrderAPT, setOrderAPT] = useState("")
  const [OrderCity, setOrderCity] = useState("")
  const [OrderState, setOrderState] = useState("")
  const [OrderZip, setOrderZip] = useState("")
  const [readMore, setReadMore] = useState(false)
  const [success, setSuccess] = useState(false)
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
  }, [state[0], nowPrice])

  async function bookThisPlace() {
    await axios.post("/bookings", {
      checkIn: state[0].startDate,
      checkOut: state[0].endDate,
      totalPrice,
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

  useEffect(() => {
    if (window.location.href.includes("success")) {
      // toast.success("Place has been successfully booked")
      bookThisPlace()
    }
  }, [])

  if (!place) return ""

  const openMenu = () => {
    setBackDrop("backdrop active")
    setAside("aside active")
  }

  const closeMenu = () => {
    setBackDrop("backdrop")
    setAside("aside")
  }

  const checkout = async () => {
    await fetch("http://localhost:3000/checkout", {
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

  if (redirect) {
    return <Navigate to={"/"} />
  }

  return (
    <>
      <div className="accommodation-page">
        <div>
          <Toaster />
        </div>
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
              {/* <Link onClick={bookThisPlace}>Reserve</Link> */}
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
      <div className={backDrop}></div>
      <aside className={aside}>
        <i onClick={closeMenu}>
          <IoCloseSharp />
        </i>
        <div className="checkout-page">
          {/* <Link className="checkout-header">
            <IoIosArrowBack />
            <h1>Confirm and pay</h1>
          </Link> */}
          <div className="checkout-container">
            <div className="checkout-content">
              <div key={place._id} className="checkout-item-content">
                <img src={place.photos[0]} alt="" />
                <div className="checkout-item-content-text">
                  <h4>{place.title}</h4>
                  <span>{place.address}</span>
                  <span>{place.country}</span>
                  <span>
                    <strong>${place.price} </strong>night
                  </span>
                </div>
              </div>
              <h4>Price Details</h4>
              <div className="checkout-price-details">
                <div className="price-details-content">
                  <span>
                    ${place.price} x {day + 1} days
                  </span>
                  <span>${place.price * day + 1}</span>
                </div>
                <div className="price-details-content">
                  <span>Service fee</span>
                  <span>$83</span>
                </div>
                <hr />
                <div className="price-details-content">
                  <span>Total</span>
                  <span>${totalPrice + 83}</span>
                </div>
              </div>
              <div className="checkout-cancellation-policy">
                <h3>Cancellation policy</h3>
                <span>
                  Get a full refund if you cancel by Jun 29, 2:30 PM (GST).
                </span>
              </div>
            </div>
            <form
              // action="/create-checkout-session"
              // method="POST"
              className="checkout-details"
            >
              <h3>Pay with Stripe</h3>
              <h5>Billing address</h5>
              <input
                type="text"
                placeholder="Street address"
                value={OrderAdress}
                onChange={(e) => setOrderAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="Apt or suite number"
                value={OrderAPT}
                onChange={(e) => setOrderAPT(e.target.value)}
              />
              <input
                type="text"
                placeholder="City"
                value={OrderCity}
                onChange={(e) => setOrderCity(e.target.value)}
              />
              <input
                type="text"
                placeholder="State"
                value={OrderState}
                onChange={(e) => setOrderState(e.target.value)}
              />
              <input
                type="text"
                placeholder="Zip code"
                value={OrderZip}
                onChange={(e) => setOrderZip(e.target.value)}
              />
              {/* <input
                type="hidden"
                name="products"
                value={place}
              /> */}
              <button>Confirm and pay</button>
            </form>
          </div>
        </div>
      </aside>
    </>
  )
}

export default AccommodationPage
