import React, { useContext, useEffect } from "react"
import logo from "../assets/digital-bnb.png"
import { Link } from "react-router-dom"
import { HiMenu } from "react-icons/hi"
import { FaUserCircle } from "react-icons/fa"
import { IoIosArrowDown } from "react-icons/io"
import { UserContext } from "../UserContext"

function HostNav() {
  const { setUserInfo, userInfo } = useContext(UserContext)
  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      credentials: "include"
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo)
      })
    })
  }, [])

  function logout() {
    fetch("http://localhost:3000/logout", {
      credentials: "include",
      method: "POST"
    })
    setUserInfo(null)
  }

  const username = userInfo?.username

  return (
    <nav>
      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>
      <div className="hosting-nav-item">
        <Link to={"/hosting/today"}>Today</Link>
        <Link to={"/hosting/inbox"}>Inbox</Link>
        <Link to={"/calendar"}>Calendar</Link>
        <Link to={"/hosting/insights"}>Insights</Link>
        <div className="hosting-menu">
          <Link to={"/listings"}>Menu</Link>
          <IoIosArrowDown />
        </div>
      </div>
      <div className="profile">
        {username ? (
          <>
            {userInfo.username}
            <Link to={"/hosting/today"} className="user-container">
              <HiMenu className="menu-icon" />
              <FaUserCircle className="user-icon" />
            </Link>
          </>
        ) : (
          <Link to={"/hosting/today"} className="user-container">
            <HiMenu className="menu-icon" />
            <FaUserCircle className="user-icon" />
          </Link>
        )}
      </div>
    </nav>
  )
}

export default HostNav
