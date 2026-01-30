import { API_BASE_URL } from ".";
import type { HttpMethod } from "../enums";
import type { ApiResponse } from "../interfaces";
import { getToken } from "../services/auth-service";

const BASE_URL = API_BASE_URL;

export async function httpRequestAsync<T, TBody = unknown> (
  url: string,
  method: HttpMethod,
  payload?: TBody
): Promise<ApiResponse<T>> {
  const token = getToken();

  const hasBody = method === "POST" || method === "PUT" || method === "PATCH";

  const response = await fetch(`${BASE_URL}/${url}`, {
    method,
    headers: {
      ...(hasBody && { "Content-Type": "application/json" }),
      Authorization: `Bearer ${token}`,
    },
    body: hasBody ? JSON.stringify(payload) : undefined,
  });

  return handleResponseAsync<T>(response)
}

async function handleResponseAsync<T> (response: Response): Promise<ApiResponse<T>> {
  const responseJson: ApiResponse<T> = await response.json();

  if (!response.ok) {
    const messages = responseJson.messages;
    const errorMessage = messages?.join(", ") ?? "Request failed";
    throw new Error(errorMessage);
  }
  return responseJson
}
