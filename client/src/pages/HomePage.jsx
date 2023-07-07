import React, { useEffect, useState } from "react"
import AccommodationsNav from "../components/AccommodationsNav"
import AccommodationsCat from "../components/AccommodationsCat"
import PlacesData from "../components/PlacesData"
import SmallFooter from "../components/SmallFooter"
import banner from "../assets/dubai-banner.mp4"
import Modal from "../components/Modal"
import axios from "axios"
import MobAccommodationsCat from "../components/MobAccommodationCat"

function HomePage() {
  const [places,setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    });
  }, []);
  
  return (
    <>
      <div className="homepage">
        <AccommodationsNav />
        <Modal />
        <h1>
          The Best Vacation Rental Apartments, Luxury Cars & Experiences in
          Dubai
        </h1>
        <AccommodationsCat places={places}/>
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
