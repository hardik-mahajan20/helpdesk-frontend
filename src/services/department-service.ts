import api from '../api/axios'
import type {
  AddDepartmentRequest,
  AllDepartmentsGet,
  ApiResponse,
  UpdateDepartmentRequest
} from '../interfaces'

const DEPARTMENT_URL = 'department'

export async function getAllDepartments<T> () {
  const url = `${DEPARTMENT_URL}/get-departments`
  const res = await api.get<ApiResponse<T>>(url)
  return res.data
}

export async function addDepartment<T> (payload: AddDepartmentRequest) {
  const url = `${DEPARTMENT_URL}/add-department`
  const res = await api.post<ApiResponse<T>>(url, payload)
  return res.data
}

export async function getDepartmentById (id: number) {
  const url = `${DEPARTMENT_URL}/get-department-by-id/${id}`
  const res = await api.get<ApiResponse<AllDepartmentsGet>>(url)
  return res.data
}

export async function updateDepartment<T> (payload: UpdateDepartmentRequest) {
  const url = `${DEPARTMENT_URL}/update-department`
  const res = await api.put<ApiResponse<T>>(url, payload)
  return res.data
}

export async function deleteDepartment<T> (id: number) {
  const url = `${DEPARTMENT_URL}/delete-department/${id}`
  const res = await api.delete<ApiResponse<T>>(url)
  return res.data
}
