export interface AgentsGet {
  userId: number;
  fullName: string;
  projects: string;
  email: string;
  phoneNumber: string;
  reportsTo: string;
  departmentName: string;
  roleName: string;
  isActive: boolean;
  avatarUrl: string;
}
