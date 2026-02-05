export interface AgentsGetById {
    userId: number;
    fullName: string;
    email: string;
    isActive: boolean;
    isChatAgent: boolean;
    projectId: number[];
    roleId: number;
    chatLimit: number;
    departmentId: number;
    reportsToId: number;
  }
  