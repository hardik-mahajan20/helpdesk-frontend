import { httpRequest } from "../api/http-Client";
import { HTTP_METHOD } from "../enums";
import type { AddProjectRequest } from "../interfaces";

const PROJECT_URL = "projects";

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
  return httpRequest<T>(url, HTTP_METHOD.POST, payload);
}

export async function deleteProject<T>(id: number) {
  const url = `${PROJECT_URL}/?projectId=${id}`;
  return httpRequest<T>(url, HTTP_METHOD.DELETE);
}
