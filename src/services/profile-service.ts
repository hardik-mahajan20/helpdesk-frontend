import api from '../api/axios'
import { ColorOption, ThemeOption } from '../enums'
import type { ApiResponse } from '../interfaces'
import type {
  EnableTwoFactorAuthResponse,
  UpdatePassword
} from '../interfaces/profile'

const PROFILE_URL = 'profile'

export async function changePassword<T> (payload: UpdatePassword) {
  const url = `${PROFILE_URL}/change-password`
  const res = await api.post<ApiResponse<T>>(url, payload)
  return res.data
}

export async function updateUserPreferences<T> (payload: {
  preferences: {
    theme: ThemeOption
    color: ColorOption
  }
}) {
  const url = `${PROFILE_URL}/update-preference-settings`
  const res = await api.post<ApiResponse<T>>(url, payload)
  return res.data
}

export async function enableTwoFactorAuth () {
  const url = `${PROFILE_URL}/enable-2fa`
  const res = await api.post<ApiResponse<EnableTwoFactorAuthResponse>>(url)
  return res.data
}

export async function disableTwoFactorAuth<T> () {
  const url = `${PROFILE_URL}/disable-2fa`
  const res = await api.post<ApiResponse<T>>(url)
  return res.data
}

export async function verifyTwoFactorAuth (code: string) {
  const url = `${PROFILE_URL}/verify-2fa-setup`
  const res = await api.post<ApiResponse<string[]>>(url, code)
  return res.data
}

export async function updateProfile<T> (formData: FormData): Promise<ApiResponse<T>> {
  const url = `${PROFILE_URL}/profile-update`

  const res = await api.post<ApiResponse<T>>(url, formData)
  return res.data
}
