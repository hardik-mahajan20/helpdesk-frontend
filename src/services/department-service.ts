import { httpRequestAsync } from '../api'
import { HTTP_METHOD } from '../enums'
import type {
  AddDepartmentRequest,
  AllDepartmentsGet,
  UpdateDepartmentRequest
} from '../interfaces'

const DEPARTMENT_URL = 'department'

export async function getAllDepartments<T> () {
  const url = `${DEPARTMENT_URL}/get-departments`
  return httpRequestAsync<T>(url, HTTP_METHOD.GET)
}

export async function addDepartment<T> (payload: AddDepartmentRequest) {
  const url = `${DEPARTMENT_URL}/add-department`
  return httpRequestAsync<T>(url, HTTP_METHOD.POST, payload)
}

export async function getDepartmentById (id: number) {
  const url = `${DEPARTMENT_URL}/get-department-by-id/${id}`
  return httpRequestAsync<AllDepartmentsGet>(url, HTTP_METHOD.GET)
}

export async function updateDepartment<T> (payload: UpdateDepartmentRequest) {
  const url = `${DEPARTMENT_URL}/update-department`
  return httpRequestAsync<T>(url, HTTP_METHOD.PUT, payload)
}

export async function deleteDepartment<T> (id: number) {
  const url = `${DEPARTMENT_URL}/delete-department/${id}`
  return httpRequestAsync<T>(url, HTTP_METHOD.DELETE)
}
