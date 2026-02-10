export type Country = "India" | "USA";
export interface PersonCreate {
  projectId: number;
  organizationId: number | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryId: number | null;
  city: string | null;
}
