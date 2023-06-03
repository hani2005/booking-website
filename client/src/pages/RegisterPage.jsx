import React from "react"
import { Link } from "react-router-dom"
import AccommodationsNav from "../components/AccommodationsNav"
import BigFooter from "../components/BigFooter"
import Modal from "../components/Modal"

function RegisterPage() {
  return (
      <div className="register-page">
        <AccommodationsNav />
        <Modal />
        <div className="register-page-content">
          <h2>Register</h2>
          <input type="email" placeholder="Enter your email" />
          <input type="password" placeholder="Enter your password" />
          <button>Register</button>
          <Link to={"/login"}>Login</Link>
        </div>
        <BigFooter />
      </div>
  )
}

export default RegisterPage
