import React, { useContext, useEffect } from "react"
import { useGlobalContext } from "../context"
import { Link } from "react-router-dom"
import { FaSearch, FaUserCircle } from "react-icons/fa"
import { HiMenu } from "react-icons/hi"
import logo from "../assets/digital-bnb.png"
import { UserContext } from "../UserContext"

function ExperienceNav() {
  const { openSidebar, openModal } = useGlobalContext()
  const { setUserInfo, userInfo } = useContext(UserContext)
  useEffect(() => {
    fetch("http://localhost:3000/api/profile", {
      credentials: "include"
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo)
      })
    })
  }, [])

  function logout() {
    fetch("http://localhost:3000/api/logout", {
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
        <span className="add-guests">Experience</span>
        <FaSearch className="nav-search" />
      </div>
      <div className="profile">
        {username ? (
          <>
            <Link to={"/host-experience"}>Host Your Experience</Link>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
            <Link to={"/hosting/today"} className="user-container">
              <HiMenu className="menu-icon" />
              <img
                src="https://github.com/hani2005/food-delivery-project/blob/master/src/img/avatar.png?raw=true"
                alt=""
                className="logged-user-icon"
              />
            </Link>
          </>
        ) : (
          <>
            <Link to={"/login"}>Host Your Experience</Link>
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

export default ExperienceNav
