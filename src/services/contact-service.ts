import api from "../api/axios";
import type { ApiResponse } from "../interfaces";
import type {
  Organization,
  OrganizationCreate,
  OrganizationRequest,
  Person,
  PersonCreate,
  PersonRequest,
} from "../interfaces/contacts";

const CONTACT_URL = "contacts";

export async function getAllContacts<PagedPersonResponse>(
  filter: PersonRequest,
) {
  const res = await api.get<ApiResponse<PagedPersonResponse>>(
    `${CONTACT_URL}/persons/getbyfilter`,
    { params: filter },
  );
  return res.data;
}

export async function getFilteredOrganizationsByProject<
  PagesOrganizationResponse,
>(filter: OrganizationRequest) {
  const res = await api.get<ApiResponse<PagesOrganizationResponse>>(
    `${CONTACT_URL}/organizations/getbyfilter`,
    { params: filter },
  );
  return res.data;
}

export async function deletePersonById<T>(id: number) {
  const res = await api.delete<ApiResponse<T>>(`${CONTACT_URL}/persons/${id}`);
  return res.data;
}

export async function deleteOrganizationById<T>(id: number) {
  const res = await api.delete<ApiResponse<T>>(
    `${CONTACT_URL}/organizations/${id}`,
  );
  return res.data;
}

export async function getOrganizationsByProjectId<T>(projectId: number) {
  const res = await api.get<ApiResponse<T>>(
    `${CONTACT_URL}/organizations/getdropdown?ProjectId=${projectId}`,
  );
  return res.data;
}

export async function createPerson<T>(personData: PersonCreate) {
  const res = await api.post<ApiResponse<T>>(
    `${CONTACT_URL}/persons/create`,
    personData,
  );
  return res.data;
}

export async function createOrganization<T>(orgData: OrganizationCreate) {
  const res = await api.post<ApiResponse<T>>(
    `${CONTACT_URL}/organizations/create`,
    orgData,
  );
  return res.data;
}

export async function getOrganizationById<T>(id: number) {
  const res = await api.get<ApiResponse<T>>(
    `${CONTACT_URL}/organizations/${id}`,
  );
  return res.data;
}

export async function updateOrganization<T>(orgData: Organization) {
  const res = await api.post<ApiResponse<T>>(
    `${CONTACT_URL}/organizations/update`,
    { params: orgData },
  );
  return res.data;
}

export async function getPersonById<T>(id: number) {
  const res = await api.get<ApiResponse<T>>(`${CONTACT_URL}/persons/${id}`);
  return res.data;
}

export async function updatePerson<T>(person: Person) {
  const res = await api.post<ApiResponse<T>>(`${CONTACT_URL}/persons/update`, {
    params: person,
  });
  return res.data;
}
