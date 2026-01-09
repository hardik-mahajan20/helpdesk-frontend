import type { Project } from "./projects";

export interface ProjectsActionsProps {
  projects: Project;
  goToSettings: (projects: Project) => void;
  onDelete: (projects: Project) => void;
}
