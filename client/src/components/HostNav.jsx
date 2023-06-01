import React from "react"
import logo from "/src/digital-bnb.png"
import { Link } from "react-router-dom"
import { HiMenu } from "react-icons/hi"
import { FaUserCircle } from "react-icons/fa"
import { IoIosArrowDown } from "react-icons/io"

function HostNav() {
  return (
    <nav>
      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>
      <div className="hosting-nav-item">
        <Link to={"/hosting/today"}>Today</Link>
        <Link to={"/hosting/inbox"}>Inbox</Link>
        <Link to={"/hosting/calendar"}>Calendar</Link>
        <Link to={"/hosting/insights"}>Insights</Link>
        <div className="hosting-menu">
          <Link to={"/listings"}>Menu</Link>
          <IoIosArrowDown />
        </div>
      </div>
      <div className="profile">
        <Link to={"/hosting/today"} className="user-container">
          <HiMenu className="menu-icon" />
          <FaUserCircle className="user-icon" />
        </Link>
      </div>
    </nav>
  )
}

export default HostNav
