import api from '../api/axios'
import type { AddProjectRequest, ApiResponse } from '../interfaces'

const PROJECT_URL = 'projects'

export async function getAllProjects<T> () {
  const res = await api.get<ApiResponse<T>>(PROJECT_URL)
  return res.data
}

export async function deleteProject<T> (id: number) {
  const url = `${PROJECT_URL}/?projectId=${id}`
  const res = await api.delete<ApiResponse<T>>(`${url}`)
  return res.data
}

export async function addProject<T> (
  payload: AddProjectRequest
): Promise<ApiResponse<T>> {
  // Converting data to formdata
  const formData = new FormData()
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as string)
    }
  })

  const res = await api.post<ApiResponse<T>>(PROJECT_URL, formData)

  return res.data
}
