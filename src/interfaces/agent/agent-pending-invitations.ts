export interface AgentPendingInvitations {
  invitationId: number;
  roleId: number;
  departmentName: string;
  reportsTo: string;
  invitedBy: string;
  invitedByEmail: string;
  expiresAt: string;
  invitedEmail: string;
}
