import { API_BASE_URL, httpRequestAsync } from '../api'
import { HTTP_METHOD } from '../enums'
import type {
  ApiResponse,
  ChatShortCutCreate,
  ChatShortCutMessages,
  ChatShortCutUpdate,
  UpdateChatWidgetRequestDTO
} from '../interfaces'
import { getToken } from './auth-service'

const PROJECT_URL = 'projects'
const CHAT_SHORTCUT_URL = 'chat-shortcut-messages'

export async function getProjectById<T> (projectId: number) {
  const url = `${PROJECT_URL}/project-by-id?projectId=${projectId}`
  return httpRequestAsync<T>(url, HTTP_METHOD.GET)
}

export async function getChatWidgetByProjectId<T> (projectId: number) {
  const url = `${PROJECT_URL}/chat-widget/${projectId}`
  return httpRequestAsync<T>(url, HTTP_METHOD.GET)
}

export async function updateChatWidgetSetting<T> (
  payload: UpdateChatWidgetRequestDTO
) {
  const url = `${PROJECT_URL}/save-chat-widget`
  return httpRequestAsync<T>(url, HTTP_METHOD.POST, payload)
}

export async function getChatShortCutMessages<T> (projectId: number) {
  const url = `${CHAT_SHORTCUT_URL}/${projectId}`
  return httpRequestAsync<T>(url, HTTP_METHOD.GET)
}

export async function toggleChatShortCutVisibility<T> (id: number) {
  const url = `${CHAT_SHORTCUT_URL}/visibility/${id}`
  return httpRequestAsync<T>(url, HTTP_METHOD.PATCH)
}

export async function deleteChatShortCut<T> (id: number) {
  const url = `${CHAT_SHORTCUT_URL}/delete/${id}`
  return httpRequestAsync<T>(url, HTTP_METHOD.PATCH)
}

export async function updateChatShortCut<T> (chatShortcut: ChatShortCutUpdate) {
  const url = `${CHAT_SHORTCUT_URL}`
  return httpRequestAsync<T>(url, HTTP_METHOD.PATCH, chatShortcut)
}

export async function createChatShortCut (chatShortcut: ChatShortCutCreate) {
  const url = `${CHAT_SHORTCUT_URL}`
  return httpRequestAsync<ChatShortCutMessages>(
    url,
    HTTP_METHOD.POST,
    chatShortcut
  )
}

export async function updateProjectDetails<T> (
  payload: any
): Promise<ApiResponse<T>> {
  const BASE_URL = API_BASE_URL
  const url = `${PROJECT_URL}`
  const token = getToken()

  const formData = new FormData()
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as any)
    }
  })

  const response = await fetch(`${BASE_URL}/${url}/update-project`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  })

  return handleResponse<T>(response)
}

async function handleResponse<T> (response: Response): Promise<ApiResponse<T>> {
  const responseJson: ApiResponse<T> = await response.json()

  if (!response.ok) {
    const messages = responseJson.messages
    const errorMessage = messages?.join(', ') ?? 'Request failed'
    throw new Error(errorMessage)
  }
  return responseJson
}
