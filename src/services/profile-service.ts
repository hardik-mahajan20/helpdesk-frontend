import { API_BASE_URL } from '../api'
import { httpRequest } from '../api/http-Client'
import { HTTP_METHOD } from '../enums'
import type { ApiResponse } from '../interfaces'
import type UpdateAgentRequest from '../interfaces/agent/update-agent-request'
import type { UpdatePassword } from '../interfaces/profile'
import { getToken } from './auth-service'

const PROFILE_URL = 'profile'

export async function getAllAgents<T> (isActive: boolean) {
  const url = `${PROFILE_URL}?&isActive=${isActive}`
  return httpRequest<T>(url, HTTP_METHOD.GET)
}

export async function getAllPendingAgents<T> () {
  const url = `${PROFILE_URL}/invitations`
  return httpRequest<T>(url, HTTP_METHOD.GET)
}

export async function getAllDepartments<T> () {
  const url = `${PROFILE_URL}/departments`
  return httpRequest<T>(url, HTTP_METHOD.GET)
}

export function getAllReportsTos<T> (roleId: number, departmentId: number) {
  const url = `${PROFILE_URL}/reports-to?roleId=${roleId}&departmentId=${departmentId}`
  return httpRequest<T>(url, HTTP_METHOD.GET)
}

export async function changePassword<T> (payload: UpdatePassword) {
  const url = `${PROFILE_URL}/change-password`
  return httpRequest<T>(url, HTTP_METHOD.POST, payload)
}

export async function updateAgent<T> (payload: UpdateAgentRequest) {
  const url = `${PROFILE_URL}/update-agent`
  return httpRequest<T>(url, HTTP_METHOD.POST, payload)
}

export async function deleteAgent<T> (id: number) {
  const url = `${PROFILE_URL}/${id}`
  return httpRequest<T>(url, HTTP_METHOD.DELETE)
}
export async function enableTwoFactorAuth<T> () {
  const url = `${PROFILE_URL}/enable-2fa`
  return httpRequest<T>(url, HTTP_METHOD.POST)
}

export async function disableTwoFactorAuth<T> () {
  const url = `${PROFILE_URL}/disable-2fa`
  return httpRequest<T>(url, HTTP_METHOD.POST)
}

export async function verifyTwoFactorAuth<ApiResponse> (code: string) {
  const url = `${PROFILE_URL}/verify-2fa-setup`
  return httpRequest<ApiResponse>(url, HTTP_METHOD.POST, code)
}

export async function updateProfile<T> (payload: any) {
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
async function handleResponse<T> (response: Response): Promise<T> {
  const responseJson: ApiResponse<T> = await response.json()

  if (!response.ok) {
    const messages = responseJson.messages
    const errorMessage = messages?.join(', ') ?? 'Request failed'
    throw new Error(errorMessage)
  }
  return responseJson.data
}
