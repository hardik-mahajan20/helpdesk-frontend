import { API_BASE_URL } from '../api'
import { httpRequest } from '../api/http-Client'
import { HTTP_METHOD } from '../enums'
import type { AddProjectRequest, ApiResponse } from '../interfaces'
import { getToken } from './auth-service'

const PROJECT_URL = 'projects'

export async function getAllProjects<T> () {
  const url = `${PROJECT_URL}`
  return httpRequest<T>(url, HTTP_METHOD.GET)
}

export async function getAllUsersProjects<T> () {
  const url = `${PROJECT_URL}/users-projects`
  return httpRequest<T>(url, HTTP_METHOD.GET)
}

export async function getAllDepartmentsSearched<T> (search: string) {
  const url = `${PROJECT_URL}?&search=${search}`
  return httpRequest<T>(url, HTTP_METHOD.GET)
}

export async function addProject<T> (payload: AddProjectRequest) {
  // This api endpoint need the payload in the FORM formate
  const BASE_URL = API_BASE_URL
  const url = `${PROJECT_URL}`
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

export async function deleteProject<T> (id: number) {
  const url = `${PROJECT_URL}/?projectId=${id}`
  return httpRequest<T>(url, HTTP_METHOD.DELETE)
}

// Heler Function
async function handleResponse<T> (response: Response): Promise<T> {
  const responseJson: ApiResponse<T> = await response.json()

  if (!response.ok) {
    const messages = responseJson.messages
    const errorMessage = messages?.join(', ') ?? 'Request failed'
    throw new Error(errorMessage)
  }
  return responseJson.data
}
