import { httpRequest } from '../api/http-Client'
import { HTTP_METHOD } from '../enums'
import type { InviteAgentRequest } from '../interfaces'
import type UpdateAgentRequest from '../interfaces/agent/update-agent-request'
import type { UpdatePassword } from '../interfaces/profile'

const AGENT_URL = 'profile'

export async function getAllAgents<T> (isActive: boolean) {
  const url = `${AGENT_URL}?&isActive=${isActive}`
  return httpRequest<T>(url, HTTP_METHOD.GET)
}

export async function getAllPendingAgents<T> () {
  const url = `${AGENT_URL}/invitations`
  return httpRequest<T>(url, HTTP_METHOD.GET)
}

export async function getAllDepartments<T> () {
  const url = `${AGENT_URL}/departments`
  return httpRequest<T>(url, HTTP_METHOD.GET)
}

export function getAllReportsTos<T> (roleId: number, departmentId: number) {
  const url = `${AGENT_URL}/reports-to?roleId=${roleId}&departmentId=${departmentId}`
  return httpRequest<T>(url, HTTP_METHOD.GET)
}

export async function changePassword<T> (payload: UpdatePassword) {
  const url = `${AGENT_URL}/change-password`
  return httpRequest<T>(url, HTTP_METHOD.POST, payload)
}

export async function updateAgent<T> (payload: UpdateAgentRequest) {
  const url = `${AGENT_URL}/update-agent`
  return httpRequest<T>(url, HTTP_METHOD.POST, payload)
}

export async function deleteAgent<T> (id: number) {
  const url = `${AGENT_URL}/${id}`
  return httpRequest<T>(url, HTTP_METHOD.DELETE)
}
