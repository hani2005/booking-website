import React, { useEffect, useState } from "react"
import placesData from "../data.js"
import { Link } from "react-router-dom"
import axios from "axios"

function PlacesData() {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data)
    })
  }, [])

  return (
    <div className="places-data-container">
      {places.map((data) => (
        <Link
          to={`/accommodation/${data._id}`}
          key={data._id}
          className="places-data"
        >
          <img src={data.photos[0]} alt="" />
          <h5>{data.address}</h5>
          <span>{data.title}</span>
          <span>
            <strong>Beds:</strong> {data.beds}
          </span>
          <p>
            <strong>Night:</strong> {data.price}
          </p>
        </Link>
      ))}
    </div>
  )
}

export default PlacesData
