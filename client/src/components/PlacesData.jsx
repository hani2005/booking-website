import React from "react"
import placesData from "../data.js"
import { Link } from "react-router-dom"

function PlacesData() {
  return (
    <div className="places-data-container">
      {placesData.map((data) => (
        <Link
          to={`/accommodation/${data.id}`}
          key={data.id}
          className="places-data"
        >
          <img src={data.mainImg} alt="" />
          <h5>{data.property}</h5>
          <span>{data.title}</span>
          <span>{data.date}</span>
          <p>night {data.price}</p>
        </Link>
      ))}
    </div>
  )
}

export default PlacesData
