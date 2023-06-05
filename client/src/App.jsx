import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AccommodationPage from "./pages/AccommodationPage"
import RentAccommodation from "./pages/RentAccommodation"
import HostingPage from "./pages/HostingPage"
import ListingsPage from "./components/ListingsPage"
import ManageListing from "./components/ManageListing"
import LoginPage from "./pages/LoginPage"
import Calendar from "./components/Calendar"
import IdCalendar from "./components/IdCalendar"
import RegisterPage from "./pages/RegisterPage"
import RentCar from "./pages/RentCar"
import Experiences from "./pages/Experiences"
import RentYourCar from "./pages/RentYourCar"
import CarDetails from "./pages/CarDetails"
import HostExperience from "./pages/HostExperience"
import Experience from "./pages/Experience"
import Checkout from "./pages/Checkout"

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/accommodation/:id" element={<AccommodationPage />} />
        <Route path="/rent-accommodation" element={<RentAccommodation />} />
        <Route path="/hosting/:subpage?" element={<HostingPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/calendar/:id" element={<IdCalendar />} />
        <Route path="/listings/:id/:subpage?" element={<ManageListing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/rent-car" element={<RentCar />} />
        <Route path="/rent-your-car" element={<RentYourCar />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/host-experience" element={<HostExperience />} />
        <Route path="/experience/:id" element={<Experience />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  )
}

export default App
