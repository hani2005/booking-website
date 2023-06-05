import React from "react"
import { useGlobalContext } from "../context"
import { Link } from "react-router-dom"
import { FaSearch, FaUserCircle } from "react-icons/fa"
import { HiMenu } from "react-icons/hi"
import logo from "../assets/digital-bnb.png"

function ExperienceNav() {
  const { openSidebar, openModal } = useGlobalContext()
  return (
    <nav>
      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>
      <div className="nav-item" onClick={openModal}>
        <span>Anywhere</span>
        <span>Any week</span>
        <span className="add-guests">Experience</span>
        <FaSearch className="nav-search" />
      </div>
      <div className="profile">
        <Link to={"/host-experience"}>Host Your Experience</Link>
        <Link to={"/hosting/today"} className="user-container">
          <HiMenu className="menu-icon" />
          <FaUserCircle className="user-icon" />
        </Link>
      </div>
    </nav>
  )
}

export default ExperienceNav
