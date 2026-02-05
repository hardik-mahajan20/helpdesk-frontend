import api from '../api/axios'
import type {
  ApiResponse,
  ChatShortCutCreate,
  ChatShortCutMessages,
  ChatShortCutUpdate,
  UpdateChatWidgetRequestDTO
} from '../interfaces'

const PROJECT_URL = 'projects'
const CHAT_SHORTCUT_URL = 'chat-shortcut-messages'

export async function getProjectById<T> (projectId: number) {
  const url = `${PROJECT_URL}/project-by-id?projectId=${projectId}`
  const res = await api.get<ApiResponse<T>>(url)
  return res.data
}

export async function getChatWidgetByProjectId<T> (projectId: number) {
  const url = `${PROJECT_URL}/chat-widget/${projectId}`
  const res = await api.get<ApiResponse<T>>(url)
  return res.data
}

export async function updateChatWidgetSetting<T> (
  payload: UpdateChatWidgetRequestDTO
) {
  const url = `${PROJECT_URL}/save-chat-widget`
  const res = await api.post<ApiResponse<T>>(url, payload)
  return res.data
}

export async function getChatShortCutMessages<T> (projectId: number) {
  const url = `${CHAT_SHORTCUT_URL}/${projectId}`
  const res = await api.get<ApiResponse<T>>(url)
  return res.data
}

export async function toggleChatShortCutVisibility<T> (id: number) {
  const url = `${CHAT_SHORTCUT_URL}/visibility/${id}`
  const res = await api.patch<ApiResponse<T>>(url)
  return res.data
}

export async function deleteChatShortCut<T> (id: number) {
  const url = `${CHAT_SHORTCUT_URL}/delete/${id}`
  const res = await api.patch<ApiResponse<T>>(url)
  return res.data
}

export async function updateChatShortCut<T> (chatShortcut: ChatShortCutUpdate) {
  const url = `${CHAT_SHORTCUT_URL}`
  const res = await api.patch<ApiResponse<T>>(url, chatShortcut)
  return res.data
}

export async function createChatShortCut (chatShortcut: ChatShortCutCreate) {
  const url = `${CHAT_SHORTCUT_URL}`

  const res = await api.post<ApiResponse<ChatShortCutMessages>>(
    url,
    chatShortcut
  )
  return res.data
}

export async function updateProjectDetails<T> (
  formData: FormData
): Promise<ApiResponse<T>> {
  const url = `${PROJECT_URL}/update-project`

  const res = await api.post<ApiResponse<T>>(url, formData)
  return res.data
}
