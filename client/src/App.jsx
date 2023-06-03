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
      </Routes>
    </div>
  )
}

export default App
