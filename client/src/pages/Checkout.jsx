import React from "react"
import { IoIosArrowBack } from "react-icons/io"
import { carsData } from "../data"
import { Link } from "react-router-dom"
import BigFooter from "../components/BigFooter"

function Checkout() {
  return (
    <div className="checkout-page">
      <Link to={"/"} className="checkout-header">
        <IoIosArrowBack />
        <h1>Confirm and pay</h1>
      </Link>
      <div className="checkout-container">
        <div className="checkout-details">
          <h3>Pay with Stripe</h3>
          <h5>Billing address</h5>
          <input type="text" placeholder="Street address" />
          <input type="text" placeholder="Apt or suite number" />
          <input type="text" placeholder="City" />
          <div className="state-zip">
            <input type="text" placeholder="State" />
            <input type="text" placeholder="Zip code" />
          </div>
          <button>Confirm and pay</button>
        </div>
        <div className="checkout-content">
          {carsData.slice(0, 1).map((item) => (
            <div key={item.id} className="checkout-item-content">
              <img src={item.mainImg} alt="" />
              <div className="checkout-item-content-text">
                <h4>{item.title}</h4>
                <span>{item.location}</span>
                <span>{item.model}</span>
                <h5>${item.price}</h5>
              </div>
            </div>
          ))}
          <h3>Price Details</h3>
          <div className="checkout-price-details">
            <div className="price-details-content">
              <span>$75 x 7 days</span>
              <span>%500</span>
            </div>
            <div className="price-details-content">
              <span>Service fee</span>
              <span>$83</span>
            </div>
            <hr />
            <div className="price-details-content">
              <span>Total</span>
              <span>$583</span>
            </div>
          </div>
          <div className="checkout-cancellation-policy">
            <h3>Cancellation policy</h3>
            <span>
              Get a full refund if you cancel by Jun 29, 2:30 PM (GST).
            </span>
          </div>
        </div>
      </div>
      <BigFooter />
    </div>
  )
}

export default Checkout
