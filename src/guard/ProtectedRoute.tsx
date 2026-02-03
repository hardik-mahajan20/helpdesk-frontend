import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { isTokenExpired, refreshToken, logout } from '../services/auth-service'

export default function ProtectedRoute () {
  const [loading, setLoading] = useState<boolean>(true)
  const [isAuth, setIsAuth] = useState<boolean>(false)

  useEffect(() => {
    const checkAuth = async () => {
      if (!isTokenExpired()) {
        setIsAuth(true)
        setLoading(false)
        return
      }

      try {
        await refreshToken()
        setIsAuth(true)
      } catch {
        logout()
        setIsAuth(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) return null

  if (!isAuth) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}
