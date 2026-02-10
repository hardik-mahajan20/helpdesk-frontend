export interface PersonById {
  id: number;
  projectId: number;
  organizationId: number;
  countryId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  isBlocked: boolean;
  isDeleted: boolean;
  firstChatAt: Date;
  lastSeenAt: null;
  createdBy: number;
  cateatedAt: Date;
  updatedBy: number;
  updatedAt: Date;
}
