import { API_BASE_URL, httpRequestAsync } from '../api'
// import { httpRequest } from '../api/http-Client'
import { HTTP_METHOD } from '../enums'
import type { AddProjectRequest, ApiResponse } from '../interfaces'
import { getToken } from './auth-service'

const PROJECT_URL = 'projects'

export async function getAllProjects<T> () {
  const url = `${PROJECT_URL}`
  return httpRequestAsync<T>(url, HTTP_METHOD.GET)
}

export async function deleteProject<T> (id: number) {
  const url = `${PROJECT_URL}/?projectId=${id}`
  return httpRequestAsync<T>(url, HTTP_METHOD.DELETE)
}

export async function addProject<T> (
  payload: AddProjectRequest
): Promise<ApiResponse<T>> {
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
