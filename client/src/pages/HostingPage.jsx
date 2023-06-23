import React, { useContext, useEffect, useState } from "react"
import HostNav from "../components/HostNav"
import BigFooter from "../components/BigFooter"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import placesData from "../data"
import { HiMenu } from "react-icons/hi"
import { DateRange } from "react-date-range"
import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic
} from "react-chat-engine-advanced"
import { UserContext } from "../UserContext"
import { format } from "date-fns"
import { BiMenu, BiSearch } from "react-icons/bi"
import { BsFillImageFill } from "react-icons/bs"

function HostingPage() {
  const { id } = useParams()
  const { setUserInfo, userInfo } = useContext(UserContext)
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data)
    })
  }, [])

  let { subpage } = useParams()
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    }
  ])

  useEffect(() => {
    fetch("http://localhost:3000/api/profile", {
      credentials: "include"
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo)
      })
    })
  }, [])

  const [bookings, setBookings] = useState([])
  useEffect(() => {
    axios.get("/bookings").then(({ data }) => {
      setBookings(data)
    })
  }, [])

  const userName = userInfo.username
  const userPassword = userInfo.password
  const chatProps = useMultiChatLogic(
    "d1edf851-346b-41d6-adb7-f520dec7f196",
    "ahmed",
    "ahmed"
  )

  return (
    <div className="hosting-page">
      <HostNav />
      {subpage === "today" && (
        <div className="today">
          <h2>
            Welcome back, <span>{userInfo.username}</span>
          </h2>
          <h4>Your reservations</h4>
          <div className="hosting-details">
            <Link to={"/hosting/today"}>Currently hosting</Link>
            <Link to={"/hosting/today/my-bookings"}>Your Bookings</Link>
            <Link to={"/hosting/today/pending-review"}>Pending Review</Link>
          </div>
          <div className="hosting-detail-container">
            {places.map((place) => (
              <Link key={place._id} to={`/accommodation/${place._id}`}>
                <img src={place.photos[0]} alt="" />
                <h5>{place.address}</h5>
                <span>{place.title}</span>
                <span>
                  <strong>Beds:</strong> {place.beds}
                </span>
                <p>night {place.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
      {subpage === "my-bookings" && (
        <div className="today">
          <h2>
            Welcome back, <span>{userInfo.username}</span>
          </h2>
          <h4>Your reservations</h4>
          <div className="hosting-details">
            <Link to={"/hosting/today"}>Currently hosting</Link>
            <Link to={"/hosting/today/my-bookings"}>Your Bookings</Link>
            <Link to={"/hosting/today/pending-review"}>Pending Review</Link>
          </div>
          <div className="hosting-booking-container">
            {bookings.map((place) => (
              <Link key={place._id}>
                <div className="hosting-booking-img">
                  <img src={place.photos[0]} alt="" />
                  <div className="hosting-booking-imgs">
                    <img src={place.photos[1]} alt="" />
                    <img src={place.photos[2]} alt="" />
                  </div>
                </div>
                <h5>{place.address}</h5>
                <span>{place.title}</span>
                <div className="hosting-booking-spans">
                  <span>
                    <strong>Beds:</strong> {place.beds}
                  </span>
                  <span>
                    <strong>Bedrooms:</strong> {place.bedrooms}
                  </span>
                  <span>
                    <strong>Bathrooms:</strong> {place.bathrooms}
                  </span>
                </div>
                <span>
                  <strong>CheckIn:</strong>{" "}
                  {format(new Date(place.checkIn), "yyyy-MM-dd")}
                </span>
                <span>
                  <strong>CheckOut:</strong>{" "}
                  {format(new Date(place.checkOut), "yyyy-MM-dd")}
                </span>
                <p>
                  {place.city}, {place.country}
                </p>
                <p>
                  <strong>Total Price:</strong> ${place.totalPrice}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
      {subpage === "pending-review" && (
        <div className="today">
          <h2>
            Welcome back, <span>{userInfo.username}</span>
          </h2>
          <h4>Your reservations</h4>
          <div className="hosting-details">
            <Link to={"/hosting/today"}>Currently hosting</Link>
            <Link to={"/hosting/today/my-bookings"}>Your Bookings</Link>
            <Link to={"/hosting/today/pending-review"}>Pending Review</Link>
          </div>
          <div className="hosting-detail-container">
            {bookings.map((place) => (
              <div key={place._id} className="pending-review">
                <img src={place.photos[0]} alt="" />
                <h5>{place.address}</h5>
                <span>Leave a review!</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {subpage === "inbox" && (
        <div className="inbox-container">
          <div className="inbox-column-1">
            <div className="inbox-heading">
              <BiMenu />
              <h3>All messages</h3>
            </div>
            <div className="inbox-search">
              <BiSearch />
              <input type="search" placeholder="Search inbox" />
            </div>
            <div className="message-box-container">
              <div className="message-box-user">
                <img
                  src="https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                />
                <div>
                  <h4>Hani</h4>
                  <h5>Thank You</h5>
                </div>
              </div>
              <div className="message-box-user">
                <img
                  src="https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                />
                <div>
                  <h4>Hani</h4>
                  <h5>Thank You</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="inbox-column-2">
            <h3>Mohammed</h3>
            <div className="message-box-user">
              <img
                src="https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
              <div>
                <h4>Hani</h4>
                <h5>Can I get your number to ask more details?</h5>
              </div>
            </div>
            <div className="message-box-user">
              <img
                src="https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
              <div>
                <h4>Hani</h4>
                <h5>Hi Kamal</h5>
              </div>
            </div>
            <div className="message-box-user">
              <img
                src="https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
              <div>
                <h4>Hani</h4>
                <h5>Please ask me here and I ll love to help</h5>
              </div>
            </div>
            <div className="message-input">
              <BsFillImageFill />
              <input type="text" placeholder="Message" />
            </div>
          </div>
          <div className="inbox-column-3">
            <div className="message-box-user">
              <img
                src="https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
              <div>
                <h4>Hani</h4>
                <h5>Located in Dubai</h5>
              </div>
            </div>
            <hr />
            <div className="host-listing">
              <h5>Listing</h5>
              <p>You dont have access to this listing</p>
              <img
                src="https://a0.muscache.com/im/pictures/miso/Hosting-891612948952049681/original/65496d15-3f82-4ca2-a03b-fec4d8dfd975.jpeg?im_w=1200"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
      {subpage === "insights" && (
        <div className="insights-container">
          <div className="insights-performance">
            <h1>Performance</h1>
            <h3 className="earnings">Earnings</h3>
            <h3>Star Host</h3>
          </div>
          <div className="performance-content-container">
            <div className="performance-content-title">
              <HiMenu className="menu-icon" />
              <span>Earnings</span>
            </div>
            <div className="performance-content">
              <div className="month-picker">
                <DateRange
                  rangeColors={["#000000"]}
                  onChange={(item) => setState([item.selection])}
                  ranges={state}
                  minDate={new Date()}
                  date={new Date()}
                />
              </div>
              <h1>$17,330</h1>
              <span>Booked earnings for 2023</span>
              <div className="performance-payment">
                <div className="paid-out">
                  <h3>$17,330</h3>
                  <span>Paid</span>
                </div>
                <div className="expected">
                  <h3>$0</h3>
                  <span>Expected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <BigFooter />
    </div>
  )
}

export default HostingPage
