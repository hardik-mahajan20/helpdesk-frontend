import type { Organization } from "./organization";

export interface PagesOrganizationResponse {
  items: Organization[];
  totalCount: number;
}
