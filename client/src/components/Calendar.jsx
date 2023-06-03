import React, { useState } from "react"
import placesData, { DAYS } from "../data"
import {
  getMonthYear,
  getSortedDays,
  nextMonth,
  prevMonth
} from "../utils"
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill
} from "react-icons/bs"
import { Link } from "react-router-dom"
import { BiSearch } from "react-icons/bi"
import HostNav from "./HostNav"
import BigFooter from "./BigFooter"

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  return (
    <div className="calendar-container">
      <HostNav />
      <div className="calendar-page">
        <div className="details-column-1">
          <h2>{placesData.length} Listings</h2>
          <div className="inbox-search">
            <BiSearch />
            <input type="search" placeholder="Search inbox" />
          </div>
          <h4>LISTING</h4>
          <div className="calendar-page-img">
            {placesData.map((item) => (
              <Link
                to={`/calendar/${item.id}`}
                className="calendar-page-content"
              >
                <img src={item.mainImg} alt="" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="wrapper">
          <div className="date-control">
            <BsFillArrowLeftCircleFill
              onClick={() => prevMonth(currentDate, setCurrentDate)}
            />
            {getMonthYear(currentDate)}
            <BsFillArrowRightCircleFill
              onClick={() => nextMonth(currentDate, setCurrentDate)}
            />
          </div>
          <div className="col-grid">
            {DAYS.map((day) => (
              <span data-unselectable="unselectable content" key={day} className="headDays">
                {day}
              </span>
            ))}
          </div>

          <div className="col-grid">
            {getSortedDays(currentDate).map((day) => (
              <div key={day} className="col-div">
                {placesData.slice(0, 1).map((item) => (
                  <>
                    <span>{day}</span>
                    <span className="span-price">{item.price}</span>
                  </>
                ))}
              </div>
            ))}
          </div>
          {/* {showPortal && (
        <Portal
          {...portalData}
          handleDelete={handleDelete}
          handlePotalClose={handlePotalClose}
        />
      )} */}
        </div>
      </div>
      <BigFooter />
    </div>
  )
}

export default Calendar
