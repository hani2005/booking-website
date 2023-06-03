import React, { useState } from "react"
import logo from "../assets/digital-bnb.png"
import { FaSearch, FaUserCircle } from "react-icons/fa"
import { HiMenu } from "react-icons/hi"
import { Link } from "react-router-dom"
import { useGlobalContext } from "../context"

function AccommodationsNav() {
  const { openSidebar, openModal } = useGlobalContext();

  return (
    <nav>
      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>
      <div className="nav-item" onClick={openModal}>
        <span>Anywhere</span>
        <span>Any week</span>
        <span>Add guests</span>
        <FaSearch className="nav-search" />
      </div>
      <div className="profile">
        <Link to={"/rent-accommodation"}>Host Your Home</Link>
        <Link to={"/hosting/today"} className="user-container">
          <HiMenu className="menu-icon" />
          <FaUserCircle className="user-icon" />
        </Link>
      </div>
    </nav>
  )
}

export default AccommodationsNav
