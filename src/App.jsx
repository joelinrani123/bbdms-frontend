import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SiteLayout from "./components/SiteLayout";
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import WhyDonate from "./pages/WhyDonate";
import BecomeDonor from "./pages/BecomeDonor";
import NeedBlood from "./pages/NeedBlood";
import ContactUs from "./pages/ContactUs";

import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AddDonor from "./pages/admin/AddDonor";
import DonorList from "./pages/admin/DonorList";
import ContactQueries from "./pages/admin/ContactQueries";
import ManagePages from "./pages/admin/ManagePages";
import UpdateContactInfo from "./pages/admin/UpdateContactInfo";
import ChangePassword from "./pages/admin/ChangePassword";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public site */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/why-donate" element={<WhyDonate />} />
          <Route path="/become-donor" element={<BecomeDonor />} />
          <Route path="/need-blood" element={<NeedBlood />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>

        {/* Admin auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin panel (protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-donor" element={<AddDonor />} />
          <Route path="donor-list" element={<DonorList />} />
          <Route path="contact-queries" element={<ContactQueries />} />
          <Route path="manage-pages" element={<ManagePages />} />
          <Route path="contact-info" element={<UpdateContactInfo />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
