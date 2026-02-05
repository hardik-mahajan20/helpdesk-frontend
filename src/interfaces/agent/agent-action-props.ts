import type { Agent } from "./agent";

export interface AgentActionsProps {
  agent: Agent;
  onEdit: (agent: Agent) => void;
  onDelete: (agent: Agent) => void;
}
