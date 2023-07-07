import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import placesData, { DAYS } from "../data"
import {
  BsCheckLg
} from "react-icons/bs"
import { getMonthYear, getSortedDays } from "../utils"
import HostNav from "./HostNav"
import BigFooter from "./BigFooter"
import { MdArrowBackIos } from "react-icons/md"
import { RxCross2 } from "react-icons/rx"
import axios from "axios"
import { DateRange } from "react-date-range"

function IdCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
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
    if (!id) {
      return
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data)
    })
  }, [id])

  if (!place) return ""

  return (
    <div className="calendar-container">
      <HostNav />
      <div className="calendar-page">
        <div className="details-column-1">
          <h4>LISTING</h4>
          <div className="calendar-page-img">
            <div className="calendar-page-content">
              <img src={place.photos[0]} alt="" />
              <span>{place.title}</span>
            </div>
          </div>
          <div className="listing-availability">
            <div className="listing-availability-header">
              <MdArrowBackIos />
              <h3>{getMonthYear(currentDate)}</h3>
            </div>
            <div className="listing-available">
              <h5>Available</h5>
              <div className="listing-available-icons">
                <RxCross2 />
                <BsCheckLg />
              </div>
            </div>
            <h5>Pricing</h5>
            <div className="listing-available-price">
              <span>${place.price}</span>
              <input type="text" />
            </div>
          </div>
        </div>

        <div className="wrapper">
          <div className="date-control">
            <div className="month-picker">
              <DateRange
                rangeColors={["#000000"]}
                onChange={(item) => setState([item.selection])}
                ranges={state}
                minDate={new Date()}
                date={new Date()}
              />
            </div>
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
                <span className="span-price">{place.price}</span>
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
