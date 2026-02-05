import { Navigate, Outlet } from 'react-router-dom'
import type { Roles } from '../enums'
import { useProfileSelectionStore } from '../services/profile-selection-service'
import type { UserProfileResponse } from '../interfaces/profile'

interface RoleGuardProps {
  allowedRoles: Roles[]
}

export const RoleGuard = ({ allowedRoles }: RoleGuardProps) => {
  const profile: UserProfileResponse | null = useProfileSelectionStore(
    s => s.profile
  )

  if (!profile) {
    return <Navigate to='/login' replace />
  }

  if (!allowedRoles.includes(profile.roleId)) {
    return <Navigate to='/unauthorized' replace />
  }

  return <Outlet />
}
