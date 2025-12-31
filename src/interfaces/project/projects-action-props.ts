import type { Project } from "./projects";

export interface ProjectsActionsProps {
  projects: Project;
  onEdit: (projects: Project) => void;
  onDelete: (projects: Project) => void;
}
