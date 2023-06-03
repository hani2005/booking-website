import React, { useState } from "react"
import { useParams } from "react-router-dom"
import placesData, { DAYS } from "../data"
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill
} from "react-icons/bs"
import { getMonthYear, getSortedDays, nextMonth, prevMonth } from "../utils"
import HostNav from "./HostNav"
import BigFooter from "./BigFooter"

function IdCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { id } = useParams()
  const place = placesData.find((place) => place.id === id)
  const { mainImg, title, price } = place
  return (
    <div className="calendar-container">
      <HostNav />
      <div className="calendar-page">
        <div className="details-column-1">
          <h4>LISTING</h4>
          <div className="calendar-page-img">
            <div className="calendar-page-content">
              <img src={mainImg} alt="" />
              <span>{title}</span>
            </div>
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
              <span key={day} className="headDays">
                {day}
              </span>
            ))}
          </div>

          <div className="col-grid">
            {getSortedDays(currentDate).map((day) => (
              <div key={day} className="col-div">
                <span>{day}</span>
                <span className="span-price">{price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BigFooter />
    </div>
  )
}

export default IdCalendar
