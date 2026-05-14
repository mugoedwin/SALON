import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import ManageBookings from "./admin/ManageBookings";
import ManageServices from "./admin/ManageServices";
import RequireAdmin from "./components/auth/RequireAdmin";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import BookingHistory from "./pages/Dashboard/BookingHistory";
import UserDashboard from "./pages/Dashboard/UserDashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/dashboard/history" element={<BookingHistory />} />
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        }
      />
      <Route
        path="/admin/bookings"
        element={
          <RequireAdmin>
            <ManageBookings />
          </RequireAdmin>
        }
      />
      <Route
        path="/admin/services"
        element={
          <RequireAdmin>
            <ManageServices />
          </RequireAdmin>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
