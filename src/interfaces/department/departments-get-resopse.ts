export interface DepartmentsGetResopse {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  departmentMembers: string;
  activeChatsCount: number;
  createdBy: number;
  updatedBy: number;
}
