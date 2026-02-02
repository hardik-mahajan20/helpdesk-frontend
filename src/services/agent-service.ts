import { httpRequestAsync } from '../api'
import { HTTP_METHOD } from '../enums'
import type { InviteAgentRequest } from '../interfaces'
import type UpdateAgentRequest from '../interfaces/agent/update-agent-request'

const AGENT_URL = 'agents'

export async function getAllAgents<T> (isActive: boolean) {
  const url = `${AGENT_URL}?&isActive=${isActive}`
  return httpRequestAsync<T>(url, HTTP_METHOD.GET)
}

export async function getAllPendingAgents<T> () {
  const url = `${AGENT_URL}/invitations`
  return httpRequestAsync<T>(url, HTTP_METHOD.GET)
}

export async function getAllDepartments<T> () {
  const url = `${AGENT_URL}/departments`
  return httpRequestAsync<T>(url, HTTP_METHOD.GET)
}

export function getAllReportsTos<T> (roleId: number, departmentId: number) {
  const url = `${AGENT_URL}/reports-to?roleId=${roleId}&departmentId=${departmentId}`
  return httpRequestAsync<T>(url, HTTP_METHOD.GET)
}

export async function inviteAgent<T> (payload: InviteAgentRequest) {
  const url = `${AGENT_URL}/invite`
  return httpRequestAsync<T>(url, HTTP_METHOD.POST, payload)
}

export async function updateAgent<T> (payload: UpdateAgentRequest) {
  const url = `${AGENT_URL}/update-agent`
  return httpRequestAsync<T>(url, HTTP_METHOD.POST, payload)
}

export async function deleteAgent<T> (id: number) {
  const url = `${AGENT_URL}/${id}`
  return httpRequestAsync<T>(url, HTTP_METHOD.DELETE)
}
