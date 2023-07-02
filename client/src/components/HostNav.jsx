import React, { useContext, useEffect, useState } from "react"
import logo from "../assets/digital-bnb.png"
import { Link } from "react-router-dom"
import { HiMenu } from "react-icons/hi"
import { FaUserCircle } from "react-icons/fa"
import { IoIosArrowDown, IoMdClose } from "react-icons/io"
import { UserContext } from "../UserContext"

function HostNav() {
  const [backDrop, setBackDrop] = useState("backdrop")
  const [aside, setAside] = useState("aside")

  const openMenu = () => {
    setBackDrop("backdrop active")
    setAside("aside active")
  }

  const closeMenu = () => {
    setBackDrop("backdrop")
    setAside("aside")
  }

  const { setUserInfo, userInfo } = useContext(UserContext)
  useEffect(() => {
    fetch("https://digitalbnb.ae/api/profile", {
      credentials: "include"
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo)
      })
    })
  }, [])

  const username = userInfo?.username

  return (
    <nav className="host-nav">
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
        <Link to={"/hosting/today"} className="user-container">
          <HiMenu className="menu-icon" />
          <FaUserCircle className="user-icon" />
        </Link>
      </div>
      <div className="mob-nav">
        <span className="menu" onClick={openMenu}>
          Menu
        </span>
        <div className={backDrop}></div>
        <aside className={aside}>
          <IoMdClose onClick={closeMenu} />
          <Link onClick={closeMenu} to={"/hosting/today"}>
            Today
          </Link>
          <Link onClick={closeMenu} to={"/hosting/inbox"}>
            Inbox
          </Link>
          <Link onClick={closeMenu} to={"/calendar"}>
            Calendar
          </Link>
          <Link onClick={closeMenu} to={"/hosting/insights"}>
            Insights
          </Link>
          <Link onClick={closeMenu} to={"/listings"}>
            Menu
          </Link>
        </aside>
      </div>
    </nav>
  )
}

export default HostNav
