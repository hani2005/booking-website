import React from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { BiSearch } from "react-icons/bi"
import HostNav from "./HostNav"
import BigFooter from "./BigFooter"
import { Link } from "react-router-dom"
import placesData from "../data"

function ListingsPage() {
  return (
    <div className="listings-page">
      <HostNav />
      <div className="listings-container">
        <h2>3 Listings</h2>
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
        <div className="listings-manage-container">
          <div className="listings-manage">
            <h3>LISTING</h3>
            <div className="listing-manage-img">
              {placesData.slice(0, 1).map((item) => (
                <Link key={item.id} to={`/listings/${item.id}/details`}>
                  <img
                    src={item.mainImg}
                    alt=""
                  />
                  <span>{item.title}</span>
                </Link>
              ))}
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
            <span>3</span>
          </div>
          <div className="beds">
            <h3>BEDS</h3>
            <span>2</span>
          </div>
          <div className="baths">
            <h3>BATHS</h3>
            <span>4</span>
          </div>
          <div className="location">
            <h3>LOCATION</h3>
            <span>Nantes, France</span>
          </div>
          <div className="last-modified">
            <h3>LAST MODIFIED</h3>
            <span>Yesterday</span>
          </div>
        </div>
      </div>
      <BigFooter />
    </div>
  )
}

export default ListingsPage
