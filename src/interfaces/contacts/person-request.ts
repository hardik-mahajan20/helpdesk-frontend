export interface PersonRequest {
  pageNumber: number;
  pageSize: number;
  search?: string | null;
  sortBy?: string | null;
  sortDirection?: "ASC" | "DESC" | "";
  isBlocked?: boolean | null;
  projectId?: number | null;
}
