import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '../services/auth-service'

export default function ProtectedRoute () {
  if (!isAuthenticated()) {
    return <Navigate to='/' replace />
  }
  return <Outlet />
}
