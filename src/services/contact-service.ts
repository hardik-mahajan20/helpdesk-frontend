import api from "../api/axios";
import type { ApiResponse } from "../interfaces";
import type {
  OrganizationRequest,
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
