import { httpRequest } from '../api/http-Client'
import { HTTP_METHOD } from '../enums'
import type {
  ChatShortCutCreate,
  ChatShortCutUpdate,
  UpdateChatWidgetRequestDTO
} from '../interfaces'

const PROJECT_URL = 'projects'
const CHATSHORCUT_URL = 'chat-shortcut-messages'

export async function getProjectById<T> (projectId: number) {
  const url = `${PROJECT_URL}/project-by-id?projectId=${projectId}`
  return httpRequest<T>(url, HTTP_METHOD.GET)
}

export async function getChatWidgetByProjectId<T> (projectId: number) {
  const url = `${PROJECT_URL}/chat-widget/${projectId}`
  return httpRequest<T>(url, HTTP_METHOD.GET)
}

export async function updateChatWidgetSetting<T> (
  payload: UpdateChatWidgetRequestDTO
) {
  const url = `${PROJECT_URL}/save-chat-widget`
  return httpRequest<T>(url, HTTP_METHOD.POST, payload)
}

export async function getChatShortCutMessages<T> (projectId: number) {
  const url = `${CHATSHORCUT_URL}/${projectId}`
  return httpRequest<T>(url, HTTP_METHOD.GET)
}

export async function toggleChatShortCutVisibility<T> (id: number) {
  const url = `${CHATSHORCUT_URL}/visibility/${id}`
  return httpRequest<T>(url, HTTP_METHOD.PATCH)
}

export async function deleteChatShortCut<T> (id: number) {
  const url = `${CHATSHORCUT_URL}/delete/${id}`
  return httpRequest<T>(url, HTTP_METHOD.PATCH)
}

export async function updateChatShortCut<T> (chatShortcut: ChatShortCutUpdate) {
  const url = `${CHATSHORCUT_URL}`
  return httpRequest<T>(url, HTTP_METHOD.PATCH, chatShortcut)
}

export async function createChatShortCut<ChatShortCutMessages> (
  chatShortcut: ChatShortCutCreate
) {
  const url = `${CHATSHORCUT_URL}`
  return httpRequest<ChatShortCutMessages>(url, HTTP_METHOD.POST, chatShortcut)
}
