import React, { useContext, useEffect } from "react"
import logo from "../assets/digital-bnb.png"
import { FaSearch, FaUserAstronaut, FaUserCircle } from "react-icons/fa"
import { HiMenu } from "react-icons/hi"
import { Link } from "react-router-dom"
import { useGlobalContext } from "../context"
import { UserContext } from "../UserContext"

function AccommodationsNav() {
  const { openSidebar, openModal } = useGlobalContext()
  const { setUserInfo, userInfo } = useContext(UserContext)
  useEffect(() => {
    fetch("https://booking-website-rho.vercel.app/api/profile", {
      credentials: "include"
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo)
      })
    })
  }, [])

  function logout() {
    fetch("https://booking-website-rho.vercel.app/api/logout", {
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
      <div className="nav-item" onClick={openModal}>
        <span>Anywhere</span>
        <span>Any week</span>
        <span className="add-guests">Add guests</span>
        <FaSearch className="nav-search" />
      </div>
      <div className="profile">
        {username ? (
          <>
            <Link to={"/rent-accommodation"}>Host Your Home</Link>
            <button className="logout-btn" onClick={logout}>Logout</button>
            <Link to={"/hosting/today"} className="user-container">
              <HiMenu className="menu-icon" />
              <img src="https://github.com/hani2005/food-delivery-project/blob/master/src/img/avatar.png?raw=true" alt="" className="logged-user-icon" />
            </Link>
          </>
        ) : (
          <>
            <Link to={"/login"}>Host Your Home</Link>
            <Link to={"/login"} className="user-container">
              <HiMenu className="menu-icon" />
              <FaUserCircle className="user-icon" />
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default AccommodationsNav
