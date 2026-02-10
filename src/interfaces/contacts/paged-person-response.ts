import type { Person } from "./person";

export interface PagedPersonResponse {
  items: Person[];
  totalCount: number;
}
