export type Country = "India" | "USA";
export interface PersonCreate {
  projectId: number;
  organizationId: number | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: Country | null;
  city: string | null;
}
