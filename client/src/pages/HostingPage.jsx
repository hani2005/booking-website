import React from "react"
import HostNav from "../components/HostNav"
import BigFooter from "../components/BigFooter"
import { Link, useParams } from "react-router-dom"
import { BiMenu, BiSearch } from "react-icons/bi"
import { BsFillImageFill } from "react-icons/bs"
import placesData from "../data"

function HostingPage() {
  let { subpage } = useParams()

  return (
    <div className="hosting-page">
      <HostNav />
      {subpage === "today" && (
        <div>
          <h2>Welcome back, Hani</h2>
          <h4>Your reservations</h4>
          <div className="hosting-details">
            <Link>Checking out(1)</Link>
            <Link>Currently hosting (1)</Link>
            <Link>Arriving soon (0)</Link>
            <Link>Upcoming (0)</Link>
            <Link>Pending Review (0)</Link>
          </div>
          <div className="hosting-detail-container">
            {placesData.slice(0, 1).map((item) => (
              <Link key={item.id} to={`/accommodation/${item.id}`}>
                <img src={item.mainImg} alt="" />
                <h5>{item.property}</h5>
                <span>{item.title}</span>
                <span>{item.date}</span>
                <p>night {item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
      {subpage === "inbox" && (
        <div className="inbox-container">
          <div className="inbox-column-1">
            <div className="inbox-heading">
              <BiMenu />
              <h3>All messages</h3>
            </div>
            <div className="inbox-search">
              <BiSearch />
              <input type="search" placeholder="Search inbox" />
            </div>
            <div className="message-box-container">
              <div className="message-box-user">
                <img
                  src="https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                />
                <div>
                  <h4>Hani</h4>
                  <h5>Thank You</h5>
                </div>
              </div>
              <div className="message-box-user">
                <img
                  src="https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                />
                <div>
                  <h4>Hani</h4>
                  <h5>Thank You</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="inbox-column-2">
            <h3>Mohammed</h3>
            <div className="message-box-user">
              <img
                src="https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
              <div>
                <h4>Hani</h4>
                <h5>Can I get your number to ask more details?</h5>
              </div>
            </div>
            <div className="message-box-user">
              <img
                src="https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
              <div>
                <h4>Hani</h4>
                <h5>Hi Kamal</h5>
              </div>
            </div>
            <div className="message-box-user">
              <img
                src="https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
              <div>
                <h4>Hani</h4>
                <h5>Please ask me here and I ll love to help</h5>
              </div>
            </div>
            <div className="message-input">
              <BsFillImageFill />
              <input type="text" placeholder="Message" />
            </div>
          </div>
          <div className="inbox-column-3">
            <div className="message-box-user">
              <img
                src="https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
              <div>
                <h4>Hani</h4>
                <h5>Located in Dubai</h5>
              </div>
            </div>
            <hr />
            <div className="host-listing">
              <h5>Listing</h5>
              <p>You dont have access to this listing</p>
              <img
                src="https://a0.muscache.com/im/pictures/miso/Hosting-891612948952049681/original/65496d15-3f82-4ca2-a03b-fec4d8dfd975.jpeg?im_w=1200"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
      {subpage === "insights" && (
        <div>
          <h1>Hello Inbox</h1>
        </div>
      )}
      <BigFooter />
    </div>
  )
}

export default HostingPage
