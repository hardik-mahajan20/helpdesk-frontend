import { API_BASE_URL } from "../api";
import { httpRequest } from "../api/http-Client";
import { HTTP_METHOD } from "../enums";
import type { AddProjectRequest, ApiResponse } from "../interfaces";
import { getToken } from "./auth-service";

const PROJECT_URL = "projects";

const BASE_URL = API_BASE_URL;

export async function getAllProjects<T>() {
  const url = `${PROJECT_URL}`;
  return httpRequest<T>(url, HTTP_METHOD.GET);
}

export async function getAllDepartmentsSearched<T>(search: string) {
  const url = `${PROJECT_URL}?&search=${search}`;
  return httpRequest<T>(url, HTTP_METHOD.GET);
}

export async function addProject<T>(payload: AddProjectRequest) {
  const url = `${PROJECT_URL}`;
  const token = getToken();

  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formData.append(key, value as any);
    }
  });

  // Direct fetch for FormData, bypassing httpRequest
  const response = await fetch(`${BASE_URL}/${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // DO NOT set Content-Type
    },
    body: formData,
  });

  // Reuse handleResponse to keep consistent handling
  return handleResponse<T>(response);
}

export async function deleteProject<T>(id: number) {
  const url = `${PROJECT_URL}/?projectId=${id}`;
  return httpRequest<T>(url, HTTP_METHOD.DELETE);
}

async function handleResponse<T>(response: Response): Promise<T> {
  const responseJson: ApiResponse<T> = await response.json();

  if (!response.ok) {
    const messages = responseJson.messages;
    const errorMessage = messages?.join(", ") ?? "Request failed";
    throw new Error(errorMessage);
  }
  return responseJson.data;
}
