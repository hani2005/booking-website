import React, { useEffect, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { BiSearch } from "react-icons/bi"
import HostNav from "./HostNav"
import BigFooter from "./BigFooter"
import { Link, useParams } from "react-router-dom"
import placesData from "../data"
import axios from "axios"

function ListingsPage() {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data)
    })
  }, [])

  return (
    <div className="listings-page">
      <HostNav />
      <div className="listings-container">
        <h2>{places.length} Listings</h2>
        <div className="listings-search">
          <div className="inbox-search">
            <BiSearch />
            <input type="search" placeholder="Search inbox" />
          </div>
          <div className="create-listing">
            <AiOutlinePlus />
            <span>Create Listing</span>
          </div>
        </div>
        {places.map((place) => (
          <div key={place._id} className="listings-manage-container">
            <div className="listings-manage">
              <h3>LISTING</h3>
              <div className="listing-manage-img">
                <Link to={`/listings/${place._id}/details`}>
                  <img src={place.photos[0]} alt="" />
                  <span>{place.title}</span>
                </Link>
              </div>
            </div>
            <div className="listing-status">
              <h3>STATUS</h3>
              <span>Listed</span>
            </div>
            <div className="instant-book">
              <h3>INSTANT BOOK</h3>
              <span>On</span>
            </div>
            <div className="bedrooms">
              <h3>BEDROOMS</h3>
              <span>{place.bedrooms}</span>
            </div>
            <div className="beds">
              <h3>BEDS</h3>
              <span>{place.beds}</span>
            </div>
            <div className="baths">
              <h3>BATHROOMS</h3>
              <span>{place.bathrooms}</span>
            </div>
            <div className="location">
              <h3>LOCATION</h3>
              <span>{place.address}</span>
            </div>
          </div>
        ))}
      </div>
      <BigFooter />
    </div>
  )
}

export default ListingsPage
