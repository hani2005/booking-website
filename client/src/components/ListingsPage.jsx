import React, { useEffect, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import HostNav from "./HostNav"
import BigFooter from "./BigFooter"
import { Link } from "react-router-dom"
import axios from "axios"

function ListingsPage() {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data)
    })
  }, [])
  const [carsData, setCarsData] = useState([])
  useEffect(() => {
    axios.get("/user-cars").then(({ data }) => {
      setCarsData(data)
    })
  }, [])
  const [experienceData, setExperienceData] = useState([])
  useEffect(() => {
    axios.get("/user-experiences").then(({ data }) => {
      setExperienceData(data)
    })
  }, [])

  return (
    <div className="listings-page">
      <HostNav />
      <div className="listings-container">
        <div className="listings-search">
          <h2>{places.length + carsData.length + experienceData.length} Listings</h2>
          <div className="create-listing">
            <AiOutlinePlus />
            <Link to={"/rent-accommodation"}>Create Listing</Link>
          </div>
        </div>
        {places.map((place) => (
          <div key={place._id} className="listings-manage-container">
            <div className="listings-manage">
              <div className="listing-manage-img">
                <Link to={`/listings/${place._id}/details`}>
                  <img src={place.photos[0]} alt="" />
                  <span>{place.title}</span>
                </Link>
              </div>
            </div>
            <div className="listings-data">
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
          </div>
        ))}
        {experienceData.map((place) => (
          <div key={place._id} className="listings-manage-container">
            <div className="listings-manage">
              <div className="listing-manage-img">
                <Link to={`/listings/${place._id}/details`}>
                  <img src={place.photos[0]} alt="" />
                  <span>{place.title}</span>
                </Link>
              </div>
            </div>
            <div className="listings-data">
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
          </div>
        ))}
        {carsData.map((place) => (
          <div key={place._id} className="listings-manage-container">
            <div className="listings-manage">
              <div className="listing-manage-img">
                <Link to={`/listings/${place._id}/details`}>
                  <img src={place.photos[0]} alt="" />
                  <span>{place.title}</span>
                </Link>
              </div>
            </div>
            <div className="listings-data">
              <div className="listing-status">
                <h3>STATUS</h3>
                <span>Listed</span>
              </div>
              <div className="instant-book">
                <h3>INSTANT BOOK</h3>
                <span>On</span>
              </div>
              {/* <div className="bedrooms">
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
              </div> */}
            </div>
          </div>
        ))}
      </div>
      <BigFooter />
    </div>
  )
}

export default ListingsPage
