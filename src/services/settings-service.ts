import { httpRequest } from '../api/http-Client'
import { HTTP_METHOD } from '../enums'

const PROJECT_URL = 'projects'

export async function getProjectById<T> (projectId: number) {
  const url = `${PROJECT_URL}/project-by-id?projectId=${projectId}`
  return httpRequest<T>(url, HTTP_METHOD.GET)
}

export async function getChatWidgetByProjectId<T> (projectId: number) {
  const url = `${PROJECT_URL}/chat-widget/${projectId}`
  return httpRequest<T>(url, HTTP_METHOD.GET)
}
