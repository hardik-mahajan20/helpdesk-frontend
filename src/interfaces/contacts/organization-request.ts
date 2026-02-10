export interface OrganizationRequest {
  pageNumber: number;
  pageSize: number;
  search?: string | null;
  sortBy?: string | null;
  sortDirection?: "ASC" | "DESC" | "";
  projectId?: number | null;
}
