import { Route, Routes } from 'react-router-dom'
import AdminDoctorsPage from '../pages/admin/AdminDoctorsPage'
import AdminQueuesPage from '../pages/admin/AdminQueuesPage'
import DoctorDashboardPage from '../pages/doctor/DoctorDashboardPage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import TakeTicketPage from '../pages/public/TakeTicketPage'
import TicketTrackingPage from '../pages/public/TicketTrackingPage'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<TakeTicketPage />} />
      <Route path="/tickets/:ticketId" element={<TicketTrackingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/doctor" element={<DoctorDashboardPage />} />
      <Route path="/admin" element={<AdminQueuesPage />} />
      <Route path="/admin/doctors" element={<AdminDoctorsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter
