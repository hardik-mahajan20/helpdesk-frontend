import api from '../api/axios'
import type { ApiResponse, InviteAgentRequest } from '../interfaces'
import type UpdateAgentRequest from '../interfaces/agent/update-agent-request'

const AGENT_URL = 'agents'

export async function getAllAgents<T> (isActive: boolean) {
  const url = `${AGENT_URL}?&isActive=${isActive}`
  const res = await api.get<ApiResponse<T>>(url)
  return res.data
}

export async function getAllPendingAgents<T> () {
  const url = `${AGENT_URL}/invitations`
  const res = await api.get<ApiResponse<T>>(url)
  return res.data
}

export async function getAllDepartments<T> () {
  const url = `${AGENT_URL}/departments`
  const res = await api.get<ApiResponse<T>>(url)
  return res.data
}

export async function getAllReportsTos<T> (
  roleId: number,
  departmentId: number
) {
  const url = `${AGENT_URL}/reports-to?roleId=${roleId}&departmentId=${departmentId}`
  const res = await api.get<ApiResponse<T>>(url)
  return res.data
}

export async function inviteAgent<T> (payload: InviteAgentRequest) {
  const url = `${AGENT_URL}/invite`
  const res = await api.post<ApiResponse<T>>(url, payload)
  return res.data
}

export async function updateAgent<T> (payload: UpdateAgentRequest) {
  const url = `${AGENT_URL}/update-agent`
  const res = await api.post<ApiResponse<T>>(url, payload)
  return res.data
}

export async function deleteAgent<T> (id: number) {
  const url = `${AGENT_URL}/${id}`
  const res = await api.delete<ApiResponse<T>>(url)
  return res.data
}
