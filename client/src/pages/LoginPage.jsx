import React, { useContext, useEffect, useState } from "react"
import AccommodationsNav from "../components/AccommodationsNav"
import BigFooter from "../components/BigFooter"
import { Link, Navigate } from "react-router-dom"
import Modal from "../components/Modal"
import { UserContext } from "../UserContext"
import axios from "axios"

function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const { setUserInfo } = useContext(UserContext)

  async function login(e) {
    e.preventDefault()
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo)
        alert("Login Successful")
        setRedirect(true)
      })
    } else {
      alert("Login Failed")
    }
  }

  // useEffect(() => {
  // axios.get("https://api.chatengine.io/users/me/", {
  //   headers: {
  //     "Project-ID": "d1edf851-346b-41d6-adb7-f520dec7f196",
  //     "User-Name": username,
  //     "User-Secret": password
  //   }
  // })
  // }, [])

  if (redirect) {
    return <Navigate to={"/"} />
  }

  return (
    <div className="login-page">
      <AccommodationsNav />
      <Modal />
      <form className="login-page-content" onSubmit={login}>
        <h2>Login</h2>
        <input
          type="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
        <Link to={"/register"}>Register</Link>
      </form>
      <BigFooter />
    </div>
  )
}

export default LoginPage
