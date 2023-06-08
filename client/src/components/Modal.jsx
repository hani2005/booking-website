import React, { useEffect } from "react"
import { FaArrowRight, FaTimes } from "react-icons/fa"
import { useGlobalContext } from "../context"
import { Link } from "react-router-dom"

function Modal() {
  const { isModalOpen, closeModal } = useGlobalContext()

  return (
    <div
      className={`${
        isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
      onClick={closeModal}
    >
      <div className="modal-container">
        <div className="modal-links">
          <div className="modal-links-content">
            <Link onClick={closeModal} to={"/"}>
              Stays
            </Link>
            <FaArrowRight />
          </div>
          <div className="modal-links-content">
            <Link onClick={closeModal} to={"/rent-car"}>
              Rent Car
            </Link>
            <FaArrowRight />
          </div>
          <div className="modal-links-content">
            <Link onClick={closeModal} to={"/experiences"}>
              Experiences
            </Link>
            <FaArrowRight />
          </div>
        </div>
        <button className="close-modal-btn" onClick={closeModal}>
          <FaTimes></FaTimes>
        </button>
      </div>
    </div>
  )
}

export default Modal
