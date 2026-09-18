import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../auth/ProtectedRoute'
import AdminDoctorsPage from '../pages/admin/AdminDoctorsPage'
import AdminQueuesPage from '../pages/admin/AdminQueuesPage'
import DoctorDashboardPage from '../pages/doctor/DoctorDashboardPage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import PatientDetailsPage from '../pages/public/PatientDetailsPage'
import TakeTicketPage from '../pages/public/TakeTicketPage'
import TicketTrackingPage from '../pages/public/TicketTrackingPage'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<TakeTicketPage />} />
      <Route path="/take-ticket/details" element={<PatientDetailsPage />} />
      <Route path="/tickets/:ticketId" element={<TicketTrackingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/doctor"
        element={
          <ProtectedRoute allowedRoles={['DOCTOR']}>
            <DoctorDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminQueuesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/doctors"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminDoctorsPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter
