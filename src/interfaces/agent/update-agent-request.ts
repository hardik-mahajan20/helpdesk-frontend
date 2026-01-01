export default interface UpdateAgentRequest {
  agentUserId: number;
  name: string;
  email: string;
  role: number;
  status: boolean;
  chatLimit: number;
  department: number;
  reportsToPerson: number;
  agentProjects: AgentProjects[];
  adminProjects: AdminProjects[];
}
export interface AgentProjects {
  id: number;
  chatAgent: boolean;
}
export interface AdminProjects {
  id: number;
  chatAgent: boolean;
}
