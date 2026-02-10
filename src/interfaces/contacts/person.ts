export interface Person {
  id: number;
  projectId: number;
  organizationId?: number | null;
  countryId?: number | null;
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;
  city?: string | null;
  isBlocked?: boolean;
  isDeleted?: boolean;
  firstChatAt?: string | null;
  lastSeenAt?: string | null;
  createdBy?: number | null;
  cateatedAt?: string;
  updatedBy?: number | null;
  updatedAt?: string | null;
  countryName: string;
  organizationName: string;
  projectName: string;
}
