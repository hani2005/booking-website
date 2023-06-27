import React, { useState } from "react"

function MobAccommodationsCat({ places }) {
  const [data, setData] = useState(places)

  const setCategory = (catItem) => {
    const result = places.filter((categoryData) => {
      return categoryData.categoriesCheck === catItem
    })
    setData(result)
  }

  return (
    <>
      <div className="mob-accommodations-category">
        <div
          className="accommodations-cat-item"
          onClick={() => setCategory("Serviced Apartment")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/88/88970.png"
            alt=""
          />
          <span>Serviced Apartment</span>
        </div>
        <div
          className="accommodations-cat-item"
          onClick={() => setCategory("Hotel Apartment")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/10365/10365182.png"
            alt=""
          />
          <span>Hotel Apartment</span>
        </div>
        <div
          className="accommodations-cat-item"
          onClick={() => setCategory("Villa")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/2935/2935898.png"
            alt=""
          />
          <span>Villa</span>
        </div>
        <div
          className="accommodations-cat-item"
          onClick={() => setCategory("Hotel Room")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/5140/5140130.png"
            alt=""
          />
          <span>Hotel Room</span>
        </div>
        <div
          className="accommodations-cat-item"
          onClick={() => setCategory("Private Room")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/6934/6934759.png"
            alt=""
          />
          <span>Private Room</span>
        </div>
        <div
          className="accommodations-cat-item"
          onClick={() => setCategory("Campsite")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/7666/7666243.png"
            alt=""
          />
          <span>Campsite</span>
        </div>
        <div
          className="accommodations-cat-item"
          onClick={() => setCategory("Farmhouse")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/2134/2134519.png"
            alt=""
          />
          <span>Farmhouse</span>
        </div>
        <div
          className="accommodations-cat-item"
          onClick={() => setCategory("Unique Stays")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/5895/5895063.png"
            alt=""
          />
          <span>Unique Stays</span>
        </div>
      </div>
    </>
  )
}

export default MobAccommodationsCat
