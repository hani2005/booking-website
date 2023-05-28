import React from "react"
import logo from "/public/digital-bnb.png"
import { AiOutlineSearch } from "react-icons/ai"
import { FaSearch, FaUserCircle } from "react-icons/fa"
import { HiMenu } from "react-icons/hi"

function AccommodationsNav() {
  return (
    <nav className="accommodations-nav">
      <img src={logo} alt="" />
      <div className="nav-item">
        <span>Anywhere</span>
        <span>Any week</span>
        <span>Add guests</span>
        <FaSearch className="nav-search" />
      </div>
      <div className="user-container">
        <HiMenu className="menu-icon" />
        <FaUserCircle className="user-icon" />
      </div>
    </nav>
  )
}

export default AccommodationsNav
