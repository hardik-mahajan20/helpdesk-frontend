import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from '../services/auth-service'

export const AuthGuard = () => {
  const token: string | null = getToken()

  if (!token) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}
