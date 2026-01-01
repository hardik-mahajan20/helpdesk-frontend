import { jwtDecode } from 'jwt-decode'
import type { ApiResponse } from '../interfaces/other/api-response'
import type { LoginRequest } from '../interfaces/auth/login-request'
import type { LoginResponse } from '../interfaces/auth/login-response'
import { API_BASE_URL } from '../api'

const AUTH_URL = `${API_BASE_URL}/auth`

let isRefreshing: boolean = false

let refreshPromise: Promise<string> | null = null

async function handleResponse<T> (response: Response): Promise<T> {
  const responseJson: ApiResponse<T> = await response.json()

  if (!response.ok) {
    const messages = responseJson.messages
    const errorMessage = messages?.join(', ') ?? 'Request failed'
    throw new Error(errorMessage)
  }

  return responseJson.data
}

export async function login (payload: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload)
  })

  return handleResponse<LoginResponse>(response)
}

export async function refreshToken (): Promise<
  ApiResponse<{ accessToken: string }>
> {
  if (isRefreshing && refreshPromise) {
    const token = await refreshPromise
    return {
      result: true,
      httpStatusCode: 200,
      messages: ['Token refreshed from pending request'],
      data: { accessToken: token }
    }
  }

  isRefreshing = false
  refreshPromise = fetch(`${AUTH_URL}/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async response => {
      if (!response.ok) {
        throw new Error('Refresh Token failed')
      }
      const result: ApiResponse<{ accessToken: string }> = await response.json()
      const newToken = result.data.accessToken
      localStorage.setItem('accessToken', newToken)
      return newToken
    })
    .finally(() => {
      isRefreshing = false
      refreshPromise = null
    })
  const token = await refreshPromise

  return {
    result: true,
    httpStatusCode: 200,
    messages: ['Token Refreshed'],
    data: { accessToken: token }
  }
}

export async function getCurrentUser<T> () {
  const response = await fetch(`${AUTH_URL}/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

  return handleResponse<T>(response)
}

export function getToken (): string | null {
  return localStorage.getItem('authToken')
}

export function setToken (token: string): void {
  localStorage.setItem('authToken', token)
}

export function clearToken (): void {
  localStorage.removeItem('authToken')
}

export function isTokenExpired (): boolean {

  const token = getToken()
  if (!token) return true
  const decoded = jwtDecode(token)
  return Date.now() >= decoded['exp']! * 1000
}

export function isAuthenticated (): boolean {
  return !getToken() && !isTokenExpired()
}

export async function logout (): Promise<ApiResponse<void>> {
  localStorage.removeItem('accessToken')
  sessionStorage.clear()

  const response = await fetch(`${AUTH_URL}/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
  return handleResponse<ApiResponse<void>>(response)
}
