export interface OrganizationById {
  id: number;
  projectId: number;
  name: string;
  email: string;
  phone: string;
  isDeleted: boolean;
  createdBy: number;
  createdAt: Date;
  updatedBy: number;
  updatedAt: Date;
}
