import React from "react"
import HostNav from "./HostNav"
import BigFooter from "./BigFooter"
import { Link, useParams } from "react-router-dom"
import { BiSearch } from "react-icons/bi"
import placesData, { amenities } from "../data"
import { BsDot, BsFillLightningFill } from "react-icons/bs"
import {
  AiFillEye,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle
} from "react-icons/ai"
import { FiMinus, FiPlus } from "react-icons/fi"

function ManageListing() {
  let { subpage } = useParams()
  const { id } = useParams()
  const place = placesData.find((place) => place.id === id)
  const {
    mainImg,
    img1,
    img2,
    img3,
    img4,
    title,
    location,
    desc,
    price,
  } = place
  return (
    <div>
      <HostNav />
      {subpage === "details" && (
        <div className="details-container">
          <div className="details-column-1">
            <h2>3 Listings</h2>
            <div className="inbox-search">
              <BiSearch />
              <input type="search" placeholder="Search inbox" />
            </div>
            <h4>LISTING</h4>
            <div className="details-column-1-img">
              <img src={mainImg} alt="" />
              <span>{title}</span>
            </div>
          </div>
          <div className="details-column-2">
            <div className="details-column-2-header">
              <h4>{title}</h4>
              <div className="details-icon">
                <BsDot className="listed-icon" />
                <BsFillLightningFill className="instant-book-icon" />
                <AiFillEye />
              </div>
            </div>
            <div className="details-links">
              <Link to={`/listings/${id}/details`}>Listing details</Link>
              <Link to={`/listings/${id}/pricing`}>
                Pricing and availability
              </Link>
              <Link to={`/listings/${id}/policies`}>Policies and rules</Link>
            </div>
            <div className="details-content">
              <div className="details-content-title">
                <h4>Photos</h4>
                <p>Edit</p>
              </div>
              <div className="details-content-img">
                <img src={mainImg} alt="" />
                <img src={img1} alt="" />
                <img src={img2} alt="" />
                <img src={img3} alt="" />
                <img src={img4} alt="" />
              </div>
            </div>
            <div className="listing-title-edit">
              <div className="details-content-title">
                <h4>Listing title</h4>
                <p>Edit</p>
              </div>
              <span className="details-content-span">{title}</span>
            </div>
            <div className="listing-desc-edit">
              <div className="details-content-title">
                <h4>Listing description</h4>
                <p>Edit</p>
              </div>
              <p>{desc}</p>
            </div>
            <div className="guests-num">
              <h4>Number of Guests</h4>
              <div className="guests-num-icons">
                <FiPlus />
                <h4>5</h4>
                <FiMinus />
              </div>
            </div>
            <div className="listing-status-edit">
              <div className="details-content-title">
                <h4>Listing status</h4>
                <p>Edit</p>
              </div>
              <span className="details-content-span">Listed</span>
            </div>
            <div className="amenities-edit">
              <div className="details-content-title">
                <h4>Amenities</h4>
                <p>Edit</p>
              </div>
              <div className="amenities-edit-data-container">
                {amenities.slice(0, 6).map((item) => (
                  <div className="amenities-edit-data">
                    <img src={item.icon} alt="" />
                    <span>{item.amenitie}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="listing-location-edit">
              <div className="details-content-title">
                <h4>Listing location</h4>
                <p>Edit</p>
              </div>
              <span className="details-content-span">{location}</span>
            </div>
            <div className="listing-category">
              <div className="details-content-title">
                <h4>Property category</h4>
                <p>Edit</p>
              </div>
              <span className="details-content-span">Serviced Apartment</span>
            </div>
            <div className="listing-space">
              <div className="details-content-title">
                <h4>Rooms and spaces</h4>
                <p>Edit</p>
              </div>
              <span>Bedroom:</span>
              <span>Bed:</span>
              <span>Bathroom:</span>
            </div>
          </div>
        </div>
      )}
      {subpage === "pricing" && (
        <div className="pricing-page">
          <div className="details-column-1">
            <h2>3 Listings</h2>
            <div className="inbox-search">
              <BiSearch />
              <input type="search" placeholder="Search inbox" />
            </div>
            <h4>LISTING</h4>
            <div className="details-column-1-img">
              <img src={mainImg} alt="" />
              <span>{title}</span>
            </div>
          </div>
          <div className="pricing-container">
            <div className="details-column-2-header">
              <h4>{title}</h4>
              <div className="details-icon">
                <BsDot className="listed-icon" />
                <BsFillLightningFill className="instant-book-icon" />
                <AiFillEye />
              </div>
            </div>
            <div className="details-links">
              <Link to={`/listings/${id}/details`}>Listing details</Link>
              <Link to={`/listings/${id}/pricing`}>
                Pricing and availability
              </Link>
              <Link to={`/listings/${id}/policies`}>Policies and rules</Link>
            </div>
            <div className="pricing-edit">
              <div className="details-content-title">
                <h4>Pricing</h4>
                <p>Edit</p>
              </div>
              <span className="details-content-span">${price}</span>
            </div>
            <div className="discounts-edit">
              <div className="details-content-title">
                <h4>Discounts</h4>
                <p>Edit</p>
              </div>
              <span className="details-content-span">Weekly discount</span>
              <span className="details-content-span">40%</span>
            </div>
            <div className="additional-charges-edit">
              <div className="details-content-title">
                <h4>Additional charges</h4>
                <p>Edit</p>
              </div>
              <div className="additional-charges-edit-span">
                <span>Cleaning fee</span>
                <span>$120 per stay, $100 per short stay</span>
              </div>
              <div className="additional-charges-edit-span">
                <span>Pet fee</span>
                <span>Pets are not allowed</span>
              </div>
            </div>
            <div className="taxes-edit">
              <div className="details-content-title">
                <h4>Taxes</h4>
                <p>Edit</p>
              </div>
              <span className="details-content-span">5.00% VAT/GST</span>
            </div>
            <div className="trip-length-edit">
              <div className="details-content-title">
                <h4>Trip length</h4>
                <p>Edit</p>
              </div>
              <div className="trip-length-edit-span">
                <span>Minimum stay</span>
                <span>3 nights</span>
              </div>
              <div className="trip-length-edit-span">
                <span>Maximum stay</span>
                <span>90 nights</span>
              </div>
              <div className="trip-length-edit-span">
                <span>Custom trip length</span>
                <span>None</span>
              </div>
            </div>
            <div className="calendar-sync">
              <h4>Calendar sync</h4>
              <div className="calendar-sync-link">
                <span>Vrbo</span>
                <p>remove</p>
              </div>
              <div className="calendar-sync-link">
                <span>Booking.com</span>
                <p>remove</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {subpage === "policies" && (
        <div className="policies-page">
          <div className="details-column-1">
            <h2>3 Listings</h2>
            <div className="inbox-search">
              <BiSearch />
              <input type="search" placeholder="Search inbox" />
            </div>
            <h4>LISTING</h4>
            <div className="details-column-1-img">
              <img src={mainImg} alt="" />
              <span>{title}</span>
            </div>
          </div>
          <div className="policies-container">
            <div className="details-column-2-header">
              <h4>{title}</h4>
              <div className="details-icon">
                <BsDot className="listed-icon" />
                <BsFillLightningFill className="instant-book-icon" />
                <AiFillEye />
              </div>
            </div>
            <div className="details-links">
              <Link to={`/listings/${id}/details`}>Listing details</Link>
              <Link to={`/listings/${id}/pricing`}>
                Pricing and availability
              </Link>
              <Link to={`/listings/${id}/policies`}>Policies and rules</Link>
            </div>
            <div className="policies-edit">
              <h4>Policies</h4>
              <div className="cancellation-edit">
                <div className="details-content-title">
                  <h4>Cancellation policy</h4>
                  <p>Edit</p>
                </div>
                <span className="details-content-span">
                  Strict: Full refund for cancellations made within 48 hours of
                  booking.
                </span>
              </div>
              <div className="instant-book-edit">
                <div className="details-content-title">
                  <h4>Instant book</h4>
                  <p>Edit</p>
                </div>
                <span className="details-content-span">
                  Instant book on Guests who meet all the requirements can book
                  instantly. Others will need to send reservation request.
                </span>
              </div>
              <div className="house-rules">
                <div className="details-content-title">
                  <h4>House rules</h4>
                  <p>Edit</p>
                </div>
                <span className="details-content-span">
                  Guests are expected to follow your rules, and they can be
                  removed from Airbnb if they cause issues.
                </span>
              </div>
              <div className="manage-house-rules">
                <span className="manage-house-rules-span">Pets Allowed</span>
                <div className="manage-house-rules-icons">
                  <AiOutlinePlusCircle />
                  <AiOutlineMinusCircle />
                </div>
              </div>
              <div className="manage-house-rules">
                <span className="manage-house-rules-span">Events Allowed</span>
                <div className="manage-house-rules-icons">
                  <AiOutlinePlusCircle />
                  <AiOutlineMinusCircle />
                </div>
              </div>
              <div className="manage-house-rules">
                <span className="manage-house-rules-span">
                  Smoking, vaping, e cigarattes
                </span>
                <div className="manage-house-rules-icons">
                  <AiOutlinePlusCircle />
                  <AiOutlineMinusCircle />
                </div>
              </div>
              <div className="manage-house-rules">
                <span className="manage-house-rules-span">
                  Commercial photography
                </span>
                <div className="manage-house-rules-icons">
                  <AiOutlinePlusCircle />
                  <AiOutlineMinusCircle />
                </div>
              </div>
              <div className="times">
                <div className="details-content-title">
                  <h4>Quiet times</h4>
                  <p>Edit</p>
                </div>
                <span className="details-content-span">Not set</span>
              </div>
              <div className="times">
                <div className="details-content-title">
                  <h4>Check in window</h4>
                  <p>Edit</p>
                </div>
                <span className="details-content-span">After 3:00 PM</span>
              </div>
              <div className="times">
                <div className="details-content-title">
                  <h4>Checkout time</h4>
                  <p>Edit</p>
                </div>
                <span className="details-content-span">12:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <BigFooter />
    </div>
  )
}

export default ManageListing
