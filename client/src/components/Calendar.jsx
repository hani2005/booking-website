import React, { useEffect, useState } from "react"
import placesData, { DAYS } from "../data"
import { getMonthYear, getSortedDays, nextMonth, prevMonth } from "../utils"
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill
} from "react-icons/bs"
import { Link } from "react-router-dom"
import { BiSearch } from "react-icons/bi"
import HostNav from "./HostNav"
import BigFooter from "./BigFooter"
import axios from "axios"

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data)
    })
  }, [])

  return (
    <div className="calendar-container">
      <HostNav />
      <div className="calendar-page-test">
        <h2>{places.length} Listings</h2>
        <div className="inbox-search">
          <BiSearch />
          <input type="search" placeholder="Search inbox" />
        </div>
        <h4>LISTING</h4>
        <div className="calendar-page-multi-date">
          {places.map((place) => (
            <div className="calendar-multi-date">
              <Link
                to={`/calendar/${place._id}`}
                className="calendar-page-content"
              >
                <img src={place.photos[0]} alt="" />
                <span>{place.title}</span>
              </Link>
              <div className="calendar-page-days">
                {getSortedDays(currentDate).map((day) => (
                  <Link
                    to={`/calendar/${place._id}`}
                    className="calendar-page-day-content"
                  >
                    <span className="calendar-page-day-content-span">{day}</span>
                    <span>{place.price}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <BigFooter />
    </div>
  )
}

export default Calendar
