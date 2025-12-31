import { jwtDecode } from "jwt-decode";
import type { ApiResponse } from "../interfaces/other/api-response";
import type { LoginRequest } from "../interfaces/auth/login-request";
import type { LoginResponse } from "../interfaces/auth/login-response";
import { API_BASE_URL } from "../api";

const AUTH_URL = `${API_BASE_URL}/auth`;

async function handleResponse<T>(response: Response): Promise<T> {
  const responseJson: ApiResponse<T> = await response.json();

  if (!response.ok) {
    const messages = responseJson.messages;
    const errorMessage = messages?.join(", ") ?? "Request failed";
    throw new Error(errorMessage);
  }

  return responseJson.data;
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse<LoginResponse>(response);
}

export async function refreshToken(): Promise<string> {
  const response = await fetch(`${AUTH_URL}/refresh`, {
    method: "POST",
    credentials: "include",
  });

  return handleResponse<string>(response);
}

export async function getCurrentUser<T>() {
  const response = await fetch(`${AUTH_URL}/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return handleResponse<T>(response);
}

export function getToken(): string | null {
  return localStorage.getItem("authToken");
}

export function setToken(token: string): void {
  localStorage.setItem("authToken", token);
}

export function clearToken(): void {
  localStorage.removeItem("authToken");
}

export function isTokenExpired(): boolean {
  const token = getToken();
  if (!token) return true;

  const decoded: { exp: number } = jwtDecode(token);
  return Date.now() >= decoded.exp * 1000;
}

export function isAuthenticated(): boolean {
  return !!getToken() && !isTokenExpired();
}

export function logout(): void {
  clearToken();
}
