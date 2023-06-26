import React, { useEffect, useState } from "react"
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
import axios from "axios"

function ManageListing() {
  let { subpage } = useParams()
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
    <div>
      <HostNav />
      {subpage === "details" && (
        <div className="details-container">
          <div className="details-column-1">
            <h4>LISTING</h4>
            <div className="details-column-1-img">
              <img src={place.photos[0]} alt="" />
              <span>{place.title}</span>
            </div>
          </div>
          <div className="details-column-2">
            <div className="details-column-2-header">
              <h3>{place.title}</h3>
              <div className="details-icon">
                <BsDot className="listed-icon" />
                <BsFillLightningFill className="instant-book-icon" />
                <Link to={`/accommodation/${place._id}`}>
                  <AiFillEye />
                </Link>
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
                <Link className="edit-link" to={`/rent-accommodation/${id}`}>
                  Edit
                </Link>
              </div>
              <div className="details-content-img">
                {place.photos.map((imgData) => (
                  <img src={imgData} alt="" />
                ))}
              </div>
            </div>
            <div className="listing-title-edit">
              <div className="details-content-title">
                <h4>Listing title</h4>
                <Link className="edit-link" to={`/rent-accommodation/${id}`}>
                  Edit
                </Link>
              </div>
              <span className="details-content-span">{place.title}</span>
            </div>
            <div className="listing-desc-edit">
              <div className="details-content-title">
                <h4>Listing description</h4>
                <Link className="edit-link" to={`/rent-accommodation/${id}`}>
                  Edit
                </Link>
              </div>
              <p>{place.description}</p>
            </div>
            <div className="guests-num">
              <h4>Number of Guests</h4>
              <div className="guests-num-icons">
                <h4>{place.maxGuests}</h4>
              </div>
            </div>
            <div className="listing-status-edit">
              <div className="details-content-title">
                <h4>Listing status</h4>
                <Link className="edit-link" to={`/rent-accommodation/${id}`}>
                  Edit
                </Link>
              </div>
              <span className="details-content-span">Listed</span>
            </div>
            <div className="amenities-edit">
              <div className="details-content-title">
                <h4>Amenities</h4>
                <Link className="edit-link" to={`/rent-accommodation/${id}`}>
                  Edit
                </Link>
              </div>
              <div className="amenities-edit-data-container">
                {place.perks.map((perk) => (
                  <div className="amenities-edit-data">
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="listing-location-edit">
              <div className="details-content-title">
                <h4>Listing location</h4>
                <Link className="edit-link" to={`/rent-accommodation/${id}`}>
                  Edit
                </Link>
              </div>
              <span className="details-content-span">{place.address}</span>
            </div>
            <div className="listing-category">
              <div className="details-content-title">
                <h4>Property category</h4>
                <Link className="edit-link" to={`/rent-accommodation/${id}`}>
                  Edit
                </Link>
              </div>
              {place.categoriesCheck.map((category) => (
                <span className="details-content-span">{category}</span>
              ))}
            </div>
            <div className="listing-space">
              <div className="details-content-title">
                <h4>Rooms and spaces</h4>
                <Link className="edit-link" to={`/rent-accommodation/${id}`}>
                  Edit
                </Link>
              </div>
              <span>Bedroom: {place.bedrooms}</span>
              <span>Bed: {place.beds}</span>
              <span>Bathroom: {place.bathrooms}</span>
            </div>
          </div>
        </div>
      )}
      {subpage === "pricing" && (
        <div className="pricing-page">
          <div className="details-column-1">
            <h4>LISTING</h4>
            <div className="details-column-1-img">
              <img src={place.photos[0]} alt="" />
              <span>{place.title}</span>
            </div>
          </div>
          <div className="pricing-container">
            <div className="details-column-2-header">
              <h3>{place.title}</h3>
              <div className="details-icon">
                <BsDot className="listed-icon" />
                <BsFillLightningFill className="instant-book-icon" />
                <Link to={`/accommodation/${place._id}`}>
                  <AiFillEye />
                </Link>
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
                <Link className="edit-link" to={`/rent-accommodation/${id}`}>
                  Edit
                </Link>
              </div>
              <span className="details-content-span">${place.price}</span>
            </div>
            <div className="discounts-edit">
              <div className="details-content-title">
                <h4>Discounts</h4>
                <Link className="edit-link" to={`/rent-accommodation/${id}`}>
                  Edit
                </Link>
              </div>
              <span className="details-content-span">Weekly discount</span>
              <span className="details-content-span">40%</span>
            </div>
            <div className="additional-charges-edit">
              <div className="details-content-title">
                <h4>Additional charges</h4>
                <Link className="edit-link" to={`/rent-accommodation/${id}`}>
                  Edit
                </Link>
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
                <Link className="edit-link" to={`/rent-accommodation/${id}`}>
                  Edit
                </Link>
              </div>
              <span className="details-content-span">5.00% VAT/GST</span>
            </div>
            <div className="trip-length-edit">
              <div className="details-content-title">
                <h4>Trip length</h4>
                <Link className="edit-link" to={`/rent-accommodation/${id}`}>
                  Edit
                </Link>
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
            <h4>LISTING</h4>
            <div className="details-column-1-img">
              <img src={place.photos[0]} alt="" />
              <span>{place.title}</span>
            </div>
          </div>
          <div className="policies-container">
            <div className="details-column-2-header">
              <h3>{place.title}</h3>
              <div className="details-icon">
                <BsDot className="listed-icon" />
                <BsFillLightningFill className="instant-book-icon" />
                <Link to={`/accommodation/${place._id}`}>
                  <AiFillEye />
                </Link>
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
                  <Link className="edit-link" to={`/rent-accommodation/${id}`}>
                    Edit
                  </Link>
                </div>
                <span className="details-content-span">
                  Strict: Full refund for cancellations made within 48 hours of
                  booking.
                </span>
              </div>
              <div className="instant-book-edit">
                <div className="details-content-title">
                  <h4>Instant book</h4>
                  <Link className="edit-link" to={`/rent-accommodation/${id}`}>
                    Edit
                  </Link>
                </div>
                <span className="details-content-span">
                  Instant book on Guests who meet all the requirements can book
                  instantly. Others will need to send reservation request.
                </span>
              </div>
              <div className="times">
                <div className="details-content-title">
                  <h4>Check in window</h4>
                  <Link className="edit-link" to={`/rent-accommodation/${id}`}>
                    Edit
                  </Link>
                </div>
                <span className="details-content-span">After 3:00 PM</span>
              </div>
              <div className="times">
                <div className="details-content-title">
                  <h4>Checkout time</h4>
                  <Link className="edit-link" to={`/rent-accommodation/${id}`}>
                    Edit
                  </Link>
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
