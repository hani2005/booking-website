import React from "react"
import AccommodationsNav from "../components/AccommodationsNav"
import AccommodationsCat from "../components/AccommodationsCat"

function HomePage() {
  return (
    <>
      <div className="homepage">
        <AccommodationsNav />
        <h1>
          The Best Vacation Rental Apartments, Luxury Cars & Experiences in
          Dubai
        </h1>
      </div>
      <video
        className="banner"
        src="/public/dubai-banner.mp4"
        muted
        autoPlay
        loop
        type="video/mp4"
      ></video>
      <AccommodationsCat />
    </>
  )
}

export default HomePage
