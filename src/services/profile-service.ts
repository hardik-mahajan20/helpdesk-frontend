import { API_BASE_URL, httpRequestAsync } from '../api'
// import { httpRequest } from '../api/http-Client'
import { ColorOption, HTTP_METHOD, ThemeOption } from '../enums'
import type { ApiResponse } from '../interfaces'
import type {
  EnableTwoFactorAuthResponse,
  UpdatePassword
} from '../interfaces/profile'
import { getToken } from './auth-service'

const PROFILE_URL = 'profile'

export async function changePassword<T> (payload: UpdatePassword) {
  const url = `${PROFILE_URL}/change-password`
  return httpRequestAsync<T>(url, HTTP_METHOD.POST, payload)
}

export async function updateUserPreferences<T> (payload: {
  preferences: {
    theme: ThemeOption
    color: ColorOption
  }
}) {
  const url = `${PROFILE_URL}/update-preference-settings`
  return httpRequestAsync<T>(url, HTTP_METHOD.POST, payload)
}

export async function enableTwoFactorAuth () {
  const url = `${PROFILE_URL}/enable-2fa`
  return httpRequestAsync<EnableTwoFactorAuthResponse>(url, HTTP_METHOD.POST)
}

export async function disableTwoFactorAuth<T> () {
  const url = `${PROFILE_URL}/disable-2fa`
  return httpRequestAsync<T>(url, HTTP_METHOD.POST)
}

export async function verifyTwoFactorAuth (code: string) {
  const url = `${PROFILE_URL}/verify-2fa-setup`
  return httpRequestAsync<string[]>(url, HTTP_METHOD.POST, code)
}

export async function updateProfile<T> (payload: any): Promise<ApiResponse<T>> {
  // This api endpoint need the payload in the FORM formate
  const BASE_URL = API_BASE_URL
  const url = `${PROFILE_URL}/profile-update`
  const token = getToken()

  const formData = new FormData()
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as any)
    }
  })

  const response = await fetch(`${BASE_URL}/${url}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  })

  return handleResponse<T>(response)
}

// Helper Function
async function handleResponse<T> (response: Response): Promise<ApiResponse<T>> {
  const responseJson: ApiResponse<T> = await response.json()

  if (!response.ok) {
    const messages = responseJson.messages
    const errorMessage = messages?.join(', ') ?? 'Request failed'
    throw new Error(errorMessage)
  }
  return responseJson
}
