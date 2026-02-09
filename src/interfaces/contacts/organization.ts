export interface Organization {
  id: number;
  projectId: number;
  name: string;
  email: string;
  phone?: string | null;
  isDeleted?: boolean;
  createdBy?: number;
  createdAt?: string;
  updatedBy?: number | null;
  updatedAt?: string | null;
  projectName: string;
}
