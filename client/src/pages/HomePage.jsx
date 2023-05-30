import React from "react"
import AccommodationsNav from "../components/AccommodationsNav"
import AccommodationsCat from "../components/AccommodationsCat"
import PlacesData from "../components/PlacesData"
import SmallFooter from "../components/SmallFooter"
import banner from "/src/dubai-banner.mp4"

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
        src={banner}
        muted
        autoPlay
        loop
        type="video/mp4"
      ></video>
      <AccommodationsCat />
      <PlacesData />
      <SmallFooter />
    </>
  )
}

export default HomePage
