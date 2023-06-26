import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaSearch } from "react-icons/fa"
import { HiMenu } from "react-icons/hi"
import { FaUserCircle } from "react-icons/fa"
import logo from "../assets/digital-bnb.png"
import { useGlobalContext } from "../context"
import { UserContext } from "../UserContext"
import { IoMdClose } from "react-icons/io"

function RentCarNav() {
  const { openSidebar, openModal } = useGlobalContext()
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
        <span className="add-guests">Rent Car</span>
        <FaSearch className="nav-search" />
      </div>
      <div className="profile">
        {username ? (
          <>
            <div className="desktop-nav">
              <Link to={"/rent-accommodation"}>Rent Your Car</Link>
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
            </div>
            <div className="mob-nav">
              <span className="menu" onClick={openMenu}>
                Menu
              </span>
              <div className={backDrop}></div>
              <aside className={aside}>
                <IoMdClose onClick={closeMenu} />
                <Link to={"/rent-accommodation"}>Rent Your Car</Link>
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
                <Link to={"/hosting/today"}>Profile</Link>
                <div className="modal-links">
                  <div className="modal-links-content">
                    <Link onClick={closeMenu} to={"/"}>Stays</Link>
                  </div>
                  <div className="modal-links-content">
                    <Link onClick={closeMenu} to={"/rent-car"}>Rent Car</Link>
                  </div>
                  <div className="modal-links-content">
                    <Link onClick={closeMenu} to={"/experiences"}>Experiences</Link>
                  </div>
                </div>
              </aside>
            </div>
          </>
        ) : (
          <>
            <div className="desktop-nav">
              <Link to={"/login"}>Rent Your Car</Link>
              <Link to={"/login"} className="user-container">
                <HiMenu className="menu-icon" />
                <FaUserCircle className="user-icon" />
              </Link>
            </div>
            <div className="mob-nav">
              <div className="menu" onClick={openMenu}>
                Menu
              </div>
              <div className={backDrop}></div>
              <aside className={aside}>
                <IoMdClose onClick={closeMenu} />
                <Link to={"/rent-accommodation"}>Rent Your Car</Link>
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
                <Link to={"/login"}>Login</Link>
                <Link to={"/register"}>Register</Link>
                <div className="modal-links">
                  <div className="modal-links-content">
                    <Link onClick={closeMenu} to={"/"}>Stays</Link>
                  </div>
                  <div className="modal-links-content">
                    <Link onClick={closeMenu} to={"/rent-car"}>Rent Car</Link>
                  </div>
                  <div className="modal-links-content">
                    <Link onClick={closeMenu} to={"/experiences"}>Experiences</Link>
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default RentCarNav
