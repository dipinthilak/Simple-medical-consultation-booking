import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";
import Header from "./components/Header.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import DoctorListAdmin from "./pages/Admin/DoctorsList.jsx";
import DoctorListPatient from "./pages/Patient/DoctorsList.jsx";
import DoctorDetail from "./pages/Patient/DoctorsDetail";
import DoctorConfig from "./pages/Admin/DoctorConfig.jsx";
import DoctorOverrides from "./pages/Admin/DoctorOverride.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin/doctors"
          element={
            <ProtectedRoute role="admin">
              <Header/>
              <DoctorListAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings/:id/:name"
          element={
            <ProtectedRoute role="admin">
              <Header/>
              <DoctorConfig />
            </ProtectedRoute>
          }
        />

                <Route
          path="/admin/override/:id/:name"
          element={
            <ProtectedRoute role="admin">
              <Header/>
              <DoctorOverrides />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/doctors"
          element={
            <ProtectedRoute role="patient">
              <Header/>
              <DoctorListPatient />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/doctor/:id"
          element={
            <ProtectedRoute role="patient">
              <Header/>
              <DoctorDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
