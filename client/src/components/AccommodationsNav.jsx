import React from "react"
import logo from "/src/digital-bnb.png"
import { FaSearch, FaUserCircle } from "react-icons/fa"
import { HiMenu } from "react-icons/hi"
import { Link } from "react-router-dom"

function AccommodationsNav() {
  return (
    <nav>
      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>
      <div className="nav-item">
        <span>Anywhere</span>
        <span>Any week</span>
        <span>Add guests</span>
        <FaSearch className="nav-search" />
      </div>
      <div className="profile">
        <Link to={"/rent-accommodation"}>Host Your Home</Link>
        <Link to={"/hosting"} className="user-container">
          <HiMenu className="menu-icon" />
          <FaUserCircle className="user-icon" />
        </Link>
      </div>
    </nav>
  )
}

export default AccommodationsNav
