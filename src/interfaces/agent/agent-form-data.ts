export interface AgentFormData {
  name: string;
  email: string;
  chatLimit: number;
  roleId: number;
  status: boolean;
  departmentId: number;
  reportsToId: number;
  projectIds: number[];
}
