import React from "react"
import { Link } from "react-router-dom"
import { FaSearch } from "react-icons/fa"
import { HiMenu } from "react-icons/hi"
import { FaUserCircle } from "react-icons/fa"
import logo from "../assets/digital-bnb.png"
import { useGlobalContext } from "../context"

function RentCarNav() {
  const { openSidebar, openModal } = useGlobalContext();
  return (
    <nav>
      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>
      <div className="nav-item" onClick={openModal}>
        <span>Anywhere</span>
        <span>Any week</span>
        <span className="add-guests">Rent Car</span>
        <FaSearch className="nav-search" />
      </div>
      <div className="profile">
        <Link to={"/rent-your-car"}>Rent Your Car</Link>
        <Link to={"/hosting/today"} className="user-container">
          <HiMenu className="menu-icon" />
          <FaUserCircle className="user-icon" />
        </Link>
      </div>
    </nav>
  )
}

export default RentCarNav
