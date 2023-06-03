import React from "react"
import AccommodationsNav from "../components/AccommodationsNav"
import BigFooter from "../components/BigFooter"
import { Link } from "react-router-dom"
import Modal from "../components/Modal"

function LoginPage() {
  return (
    <div className="login-page">
      <AccommodationsNav />
      <Modal />
      <div className="login-page-content">
        <h2>Login</h2>
        <input type="email" placeholder="Enter your email" />
        <input type="password" placeholder="Enter your password" />
        <button>Login</button>
        <Link to={"/register"}>Register</Link>
      </div>
      <BigFooter />
    </div>
  )
}

export default LoginPage
