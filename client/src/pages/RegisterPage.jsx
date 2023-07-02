import React, { useState } from "react"
import { Link } from "react-router-dom"
import AccommodationsNav from "../components/AccommodationsNav"
import BigFooter from "../components/BigFooter"
import Modal from "../components/Modal"

function RegisterPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function register(e) {
    e.preventDefault()
    const response = await fetch("https://digitalbnb.ae/api/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" }
    })
    if (response.status === 200) {
      alert("Register Successful")
    } else {
      alert("Register Failed")
    }
  }

  return (
    <div className="register-page">
      <AccommodationsNav />
      <Modal />
      <form className="register-page-content" onSubmit={register}>
        <h2>Register</h2>
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
        <button>Register</button>
        <Link to={"/login"}>Login</Link>
      </form>
      <BigFooter />
    </div>
  )
}

export default RegisterPage
