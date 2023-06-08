import React from "react"
import AccommodationsNav from "../components/AccommodationsNav"
import AccommodationsCat from "../components/AccommodationsCat"
import PlacesData from "../components/PlacesData"
import SmallFooter from "../components/SmallFooter"
import banner from "../assets/dubai-banner.mp4"
import Modal from "../components/Modal"

function HomePage() {
  return (
    <>
      <div className="homepage">
        <AccommodationsNav />
        <Modal />
        <h1>
          The Best Vacation Rental Apartments, Luxury Cars & Experiences in
          Dubai
        </h1>
      <AccommodationsCat />
      </div>
      <video
        className="banner"
        src={banner}
        muted
        autoPlay
        loop
        type="video/mp4"
      ></video>
      <PlacesData />
      <SmallFooter />
    </>
  )
}

export default HomePage
